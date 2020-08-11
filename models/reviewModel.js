const mongoose = require('mongoose');
const Tour = require('./tourModels');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'A Review must have a content']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'A Review must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Review must belong to a user']
    }
});

reviewSchema.index({
    tour: 1,
    user: 1
}, {
    unique: true
});

reviewSchema.statics.calcAverageRating = async function (tourId) {
    const stats = await this.aggregate([{
            $match: {
                tour: tourId
            }
        },
        {
            $group: {
                _id: '$tour',
                nRatings: {
                    $sum: 1
                },
                avgRating: {
                    $avg: '$rating'
                }
            }
        }
    ]);

    await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: stats[0].nRatings,
        ratingsAverage: stats[0].avgRating
    })
};

reviewSchema.post('save', function () {
    this.constructor.calcAverageRating(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRating(this.r.tour);
});


reviewSchema.pre(/^find/, function (next) {
    console.log('Reached here');
    this.populate({
        path: 'user',
        select: 'name photo'
    });

    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;