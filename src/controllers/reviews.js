const { response } = require("express");

const Review = require("../models/Review");

const getReviews = async (req, res = response) => {
  const reviews = await Review.find().populate("user", "name");
  res.json({
    ok: true,
    reviews,
  });
};

const createReview = async (req, res = response) => {
  const review = new Review(req.body);

  try {
    review.user = req.uid;
    const reviewSaved = await review.save();
    res.json({
      ok: true,
      reviewSaved,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please, talk with the administrator",
    });
  }
};

const updateReview = async (req, res = response) => {
  const reviewId = req.params.id;
  const uid = req.uid;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        ok: false,
        msg: "Review not exits with this Id",
      });
    }

    if (review.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have authorization to edit this review",
      });
    }

    const newReview = {
      ...req.body,
      user: uid,
    };

    const reviewUpdated = await Review.findByIdAndUpdate(reviewId, newReview, {
      new: true,
    });

    res.json({
      ok: true,
      review: reviewUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please, talk with the administrator",
    });
  }
};

const deleteReview = async (req, res = response) => {
  const reviewId = req.params.id;
  const uid = req.uid;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        ok: false,
        msg: "Review not exits with this Id",
      });
    }

    if (review.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have authorization to delete this review",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please, talk with the administrator",
    });
  }
};

module.exports = {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
};
