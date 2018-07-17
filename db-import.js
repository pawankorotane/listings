/**
 * This file will import data from CSV file
 * And create all the schema
 */
const mongoose = require("mongoose");
const moment = require("moment");

const listings = require("./api/models/listings");
const branches = require("./api/models/branches");
const stats = require("./api/models/stats");

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb://mongodb:27017/zoopla`,
  (err, data) => console.log("Connection Successful")
);

const csvFilePath = "properties.csv";
const csv = require("csvtojson");

(async () => {
  const fileData = await csv().fromFile(csvFilePath);  //gets the content from the file
  const branchTemp = [];
  for (let index = 0; index < fileData.length; index++) {
    const val = fileData[index];
  
    const listing = {   // listing data object
      listing: val["Listing"],
      address: val["Address"],
      first_publish_date: moment(val["First published date"], "YYYY-MM-DD"),
      listing_status: val["Listing status"],
      no_of_bedrooms: val["No of bedrooms"],
      no_of_bathrooms: val["No of bathrooms"],
      price: val["Price"],
      currency: val["Price"].substr(0, 1)
    };

    const branch = {  
      branch: val["Branch name"],
      address: val["Branch address"]
    };

    const statsData = {
      search_views: val["Search views"],
      normal_detail_views: val["normal detail views"],
      premium_detail_views: val["Premium detail views"],
      normal_click_through_rate: val["normal click through rate"],
      premium_click_through_rate: val["Premium Click through rate"]
    };
    const listResult = await listings.create(listing);
    const statResult = await stats.create(Object.assign(statsData, {listing : listResult._id}));
    let branchesResult = "";
    if (branchTemp.indexOf(val["Branch name"]) === -1) {   // checking if branch is exist or not helps in storing unique branches in DB
      branchesResult = await branches.create(
        Object.assign(branch, { $push : {listings: [listResult._id ]}})
      );
      branchTemp.push(val["Branch name"]);
    } else {
      branchesResult = await branches.findOneAndUpdate(
        { branch: val["Branch name"] },
        { $push : {listings: [listResult._id ]}}
      );
      console.log(branchesResult);
    }
    await listings.findByIdAndUpdate(listResult._id, {
      stats: statResult._id,
      branch: branchesResult._id
    });
  }
})();
