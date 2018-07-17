"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const listingSchema = new Schema(
  {
    listing: String,
    address: { type: String, required: true },
    first_publish_date: Date,
    listing_status: { type: String, required: true },
    no_of_bedrooms: { type: Number },
    no_of_bathrooms: { type: Number },
    price: { type: Currency },
    currency: {type : String},
    stats: { type: Schema.Types.ObjectId, ref: 'Stats' },
    branch: { type: Schema.Types.ObjectId, ref: 'Branches' }
  },
  {
    versionKey: false
  }
);


const Listing = mongoose.model("Listings", listingSchema);
module.exports = Listing;
