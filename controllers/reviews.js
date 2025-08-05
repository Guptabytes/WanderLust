const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("new Review saved");
    // res.send("new review saved");

    req.flash("success", " New Review Created!");
    res.redirect(`/listings/${listing._id}`)
};



module.exports.destroyReview =  async(req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {review: reviewId }})
    await Review.findByIdAndDelete(reviewId)

    req.flash("danger", " Review Deleted!");
    res.redirect(`/listings/${id}`)
};