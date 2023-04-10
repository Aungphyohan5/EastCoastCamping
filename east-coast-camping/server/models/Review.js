
const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  camp: {
    type: Schema.Types.ObjectId,
    ref: 'CampGround',
  },
  rating: {
    type: Types.Decimal128,
    required: true,
    min: 0,
    max: 5
  },
  text: {
    type: String,
    required: true,
    minlength: 5
  }
})

const Review = model('Review', reviewSchema);

module.exports = Review;