"use strict";
const listings = require("../models/listings");
const getAllListings = (req, res) => {
  const pageOptions = {
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 20
  };
  listings
    .find({})
    .limit(pageOptions.limit)
    .skip(pageOptions.offset * pageOptions.limit)
    .select("-stats -branch")
    .exec((err, data) => {
      if (err) {
        res.json({ message: "Error in getting data" }).status(500);
      }
      res.json(data);
    });
};

module.exports = { getAllListings };

