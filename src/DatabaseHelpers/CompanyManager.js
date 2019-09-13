const dbInstance = require('../mongodbUtil').getDb();
const Company = require('../models/Company');
const ObjectId = require('mongodb').ObjectID;
class CompanyManger {
    constructor() {
        this.collectionName = "Company";
        this.collection = dbInstance.collection(this.collectionName);
    }
    addCompany(companyName, owns, website, department, numberOfEmployee, logo, city, country, callback) {
        let company = new Company(companyName, owns, website, department, numberOfEmployee, logo, city, country);
        this.collection.insertOne(company, (err, data) => {
            if (err) {
                callback(new Error("unknown error"));
                return;
            }
            callback(null, data)
            return;
        })
    }
    getAllCompany(callback) {
        this.collection.find({}).toArray((err, data) => {
            if (err) {
                callback(new Error("Unknown erorr"));
                return
            }
            callback(null, data)
        })
    }
    getCompanyById(companyId, callback) {
        let _id = new ObjectId(companyId);
        this.collection.findOne({
            "_id": _id
        }, (err, company) => {
            if (err) {
                callback(new Error("unknown error"));
                return
            }
            if (!company) {
                err = new Error("Not found")
                callback(err)
                return
            }
            callback(null, company)
        })
    }
    addReviewIdInCompany(companyId, reviewId, callback) {
        this.collection.updateOne({
            "_id": new ObjectId(companyId)
        }, {
            $push: {
                "reviews": reviewId
            }
        }, (err, data) => {
            if (err) {
                callback(new Error("unsucessful"));
                return
            }
            callback(null, data)
        })
    }
    search(query, callback){
        this.collection.find({companyName:{$regex: '^'+ query,$options:'i'}}).toArray((err, companies)=>{
            if (err){
                callback(new Error("Unknown Error"))
                return
            }
            callback(null, companies)
        })
    }
}



module.exports = CompanyManger;