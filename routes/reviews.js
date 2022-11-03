const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js')
const reviews = require('../controllers/reviews')

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');



const { reviewSchema } = require('../schemas.js')

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.createReview))

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.deleteReview))

module.exports = router;