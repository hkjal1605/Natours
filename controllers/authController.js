const { promisify } = require("util");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const url = `${req.protocol}://${req.get("host")}/me`;
  console.log(url);
  await new Email(user, url).sendWelcome();

  createSendToken(user, 201, res);
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Please provide the email and password!", 400));
  }

  // Check if the user exists and the password is correct
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Enter a valid email and password", 401));
  }

  // Send back the status

  createSendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "LoggedOut", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // Check if the token exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access", 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user credentials have not changed
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError("The user with the given token doesnot exist!", 401)
    );
  }

  // Check if the user has changed password after creating the token
  if (freshUser.checkPasswordAfter(decoded.iat)) {
    return next(
      new AppError("The user changed password! Please login again", 401)
    );
  }

  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have the permssions to perform this action!",
          403
        )
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Find the user from the given email
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return next(new AppError("No user found with the given email id!", 404));
  }

  //Create a token for password reset
  const resetToken = user.createPasswordResetToken();
  await user.save({
    validateBeforeSave: false,
  });

  // Send the user email
  const requestUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a patch request with your new password at ${requestUrl}.\n If you have not forgotten your password, then ignore the email!`;

  try {
    await Email({
      email: user.email,
      subject: "Your password reset token (Valid only for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "succes",
      message: "Password reset token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save({
      validateBeforeSave: false,
    });

    return next(new AppError("Error sending email!", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Check if the token exists
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired!", 400));
  }

  // Make the neccessary changes in the user document
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;

  await user.save();

  // Log the user in
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from collection
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(
      new AppError("The user with the given token doesnot exist", 404)
    );
  }

  // Check the POSTed current password
  const currentPassword = req.body.currentPassword;

  if (!currentPassword) {
    return next(new AppError("Please enter the current password", 400));
  }

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Enter a valid current password", 400));
  }

  // Update Password
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  if (!newPassword || !confirmNewPassword) {
    return next(new AppError("Please enter new Password", 400));
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;
  await user.save();

  // Log in the user again
  const newToken = signToken(user._id);

  res.status(200).json({
    status: "Success",
    data: {
      newToken,
    },
  });
});
