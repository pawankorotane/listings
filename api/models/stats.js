"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema(
  {
    search_views: { type: Number, default: 0 },
    normal_detail_views: { type: Number, default: 0 },
    premium_detail_views: { type: Number, default: 0 },
    normal_click_through_rate: { type: Number, default: 0 },
    premium_click_through_rate: { type: Number, default: 0 },
    listing: { type: Schema.Types.ObjectId, ref: "Listings" }
  },
  {
    versionKey: false
  }
);

const Stats = mongoose.model("Stats", stateSchema);
module.exports = Stats;