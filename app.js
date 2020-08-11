const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const path = require("path");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const tourRouter = require("./routes/toursRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const bookingRouter = require("./routes/bookingRouter");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(cookieParser());

app.use(express.json());

app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// Serving static files
app.use(express.static(`${__dirname}/client/public`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/booking", bookingRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build"));
});

app.all("*", (req, res, next) => {
  // const err = new Error(
  //     `The route ${req.originalUrl} could not be found on this server!`
  // );
  // err.statusCode = 404;
  // err.status = 'Failed';

  next(
    new AppError(
      `The route ${req.originalUrl} could not be found on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
