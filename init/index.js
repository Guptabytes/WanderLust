const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=> {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async() => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner : "67fb989ff03bc3b2d8c7b9ea"}));
    await Listing.insertMany( initdata.data );
    console.log("data was initialised")
}

initDB();
