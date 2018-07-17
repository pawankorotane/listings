"use strict";

const branches = require("../models/branches");
const getAllBranches = (req, res) => {
  const pageOptions = {
    offset: parseInt(req.query.offset) || 0,
    limit: parseInt(req.query.limit) || 20
  };
  branches
    .aggregate([
      {
        $project: {
          branch: 1,
          address: 1,
          listing_count: { $size: "$listings" }
        }
      }
    ])
    .limit(pageOptions.limit)
    .skip(pageOptions.offset * pageOptions.limit)
    .exec((err, data) => {
      if (data.length == 0) {
        return res.json({ message: "No branches found", status: 204 });
      }
      if (err) {
        res.json({ message: "Error in getting data" }).status(500);
      }
      res.json(data);
    });
};

module.exports = { getAllBranches };
