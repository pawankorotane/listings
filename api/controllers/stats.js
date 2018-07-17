"use strict";
const stats = require("../models/stats");
const listings = require("../models/listings");
const branches = require("../models/branches");
const getAllListingsStats = (req, res) => {
  const pageOptions = {
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 20
  };
  stats
    .find({})
    .select("-_id")
    .populate({ path: "listing" })
    .limit(pageOptions.limit)
    .skip(pageOptions.offset * pageOptions.limit)
    .exec((err, data) => {
      if (err) {
        res.json({ message: "Error in getting data" }).status(500);
      }
      res.json(data);
    });
};


const getAllListingBranchStats = (req, res) => {
  const pageOptions = {
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 20
  };
  branches
    .find()
    .populate({ path: "listings", select: "_id listing_status", populate : {path : "stats" , select : "-_id -listing"}})
    .limit(pageOptions.limit)
    .skip(pageOptions.offset * pageOptions.limit)
    .exec((err, data) => {
      if (data.length == 0) {
        return res.json({ message: "No listing found", status: 204 });
      }
      if (err) {
        res.json({ message: "Error in getting data" }).status(500);
      }
      res.json(data);
    });
};

module.exports = { getAllListingsStats, getAllListingBranchStats };
