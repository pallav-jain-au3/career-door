const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://pallav:pallavjain409@cluster0-yvcbq.mongodb.net/test?retryWrites=true&w=majority";

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            console.log(err)
            _db = client.db('CareerDoor');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};