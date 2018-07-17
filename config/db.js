const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = () => {
    mongoose.set('debug', true);
    return mongoose.connect(`mongodb://mongodb:27017/zoopla`,(err, data) => console.log('Connection Successful'));
}

const disconnect = () => mongoose.disconnect();

module.exports = {
    connect,
    mongoose,
    disconnect
};