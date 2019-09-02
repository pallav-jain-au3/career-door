const dbInstance = require('../mongodbUtil').getDb();
const User = require('../models/User');
class UserEmployeeManager {
    constructor() {
        this.collectionName = "UserEmployee";
        this.collection = dbInstance.collection(this.collectionName)
    }
    createNewEmployeeUser(username, password, callback) {
        const user = new User(username, password);
        this.collection.findOne({
            "username": username
        }, (err, data) => {
            if (err) {
                callback(new Error("Unknown Error"))
                return;
            }
            if (data) {
                callback(new Error("Username already exists"));
                return
            }
            this.collection.insertOne(user, (err, data) => {
                if (err) {
                    callback(err)
                    return
                }
                callback(null, data._id);
            })
        })

    }
    loginUser(username, password, callback){
        this.collection.findOne({"username":username},(err, data)=>{
            if (err){
                callback(new Error("unknown error"));
                return
            }
            if (!data){
                callback(new Error("Incorrect username and password"));
                return;
            }
            let passwordInDb = data.password;
            if(password !== passwordInDb){
                callback(new Error("Incorrect username and password"));
                return;
            }
            callback(null, data)
        })
    }
}

module.exports = UserEmployeeManager;