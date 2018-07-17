"use strict";

const SwaggerExpress = require("swagger-express-mw");
const app = require("express")();
module.exports = app; // for testing
const db = require('./config/db');
db.connect();
const config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

  swaggerExpress.register(app);
  const port = process.env.PORT || 10010;
  app.listen(port, () => `Server is running on ${port}`);
});

