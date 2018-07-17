'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var request = require('request');
var expect = chai.expect;

describe('/listings', function() {
  describe('get', function() {
    it('should respond with 200 Success', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "ID of the listing"
            },
            "listing": {
              "type": "string",
              "description": "Advertised Property"
            },
            "address": {
              "type": "string",
              "description": "Address of the property"
            },
            "first_publish_date": {
              "type": "string",
              "format": "date-time",
              "description": "Date the property was advertised first"
            },
            "listing_status": {
              "type": "string",
              "description": "Listing Status"
            },
            "no_of_bedrooms": {
              "type": "integer",
              "description": "Number of bedrooms"
            },
            "no_of_bathrooms": {
              "type": "integer",
              "description": "Number of bathrooms"
            },
            "price": {
              "type": "integer",
              "description": "Price of the property"
            },
            "currency": {
              "type": "string",
              "description": "Currency"
            }
          }
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:3001/v1/listings',
        json: true,
        qs: {
          offset: 0 ,limit: 20
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);

        expect(res.statusCode).to.equal(200);

        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with default Error', function(done) {
      /*eslint-disable*/
      var schema = {
        "required": [
          "message"
        ],
        "properties": {
          "message": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://localhost:3001/v1/listings',
        json: true,
        qs: {
          offset: 0 ,limit: 70
        },
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
      function(error, res, body) {
        if (error) return done(error);
        console.log(res.data);
        expect(res.statusCode).to.equal(400);
        expect(validator.validate(body, schema)).to.be.true;
        done();
      });
    });

  });

});
