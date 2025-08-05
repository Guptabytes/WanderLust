const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const user = require("./user.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // // type: String,
        // // set: (v) => {
        // //     v === "" 
        // //     ? "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
        // //     : v
        // // }
        // filename: String,
        // url: {
        //     type: String,
        //     default: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
        // }
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports =  Listing ;