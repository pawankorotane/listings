"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema =  new Schema(
    {
      branch: { type: String, required: true },
      address: { type: String, required: true },
      listings : [{ type: Schema.Types.ObjectId, ref: 'Listings' }]
    },
    {
      versionKey: false
    }
  );
  
  // the schema is useless so far
  // we need to create a model using it
  const Branches = mongoose.model("Branches", branchSchema);
  
  // make this available to our users in our Node applications
  module.exports = Branches;