const dbInstance = require('../mongodbUtil').getDb();
const Review = require('../models/Review');
const ObjectId = require('mongodb').ObjectID;
class ReviewMannager {
    constructor() {
        this.collectionName = "Reviews";
        this.collection = dbInstance.collection(this.collectionName);

    }
    addReview(userId, companyId, reviewHeading, description, reviewRating, callback) {

        let review = new Review(userId, companyId, reviewHeading, description, reviewRating);
        this.collection.insertOne({
            review
        }, (err, data) => {
            if (err) {
                callback(new Error("Unknown Error"));
                return
            }
            callback(null, data.insertedId);
        });
    }
    getReviewOfEmployee(userId, callback) {
        this.collection.find({
            "review.userId": userId
        }).toArray((err, data) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, data)
        })
    }

    getReviewByCompanyId(companyId, callback) {
        this.collection.find({
            "review.companyId": companyId
        }).toArray((err, reviews) => {
            if (err) {
                callback(err);
                return
            }
            callback(null, reviews)
        })
    }
    editReview(reviewId, updatedReview ,callback) {
        this.collection.updateOne({"_id":new ObjectId(reviewId)},{$set:updatedReview},(err, result)=>{
            if(err){
                callback(new Error("Unknown Error"))
                return;
            }
            callback(null, result);
        })
    }
    getReviewFromReviewId(reviewId, callback){
        this.collection.findOne({"_id": new ObjectId(reviewId)}, (err, review)=>{
            if (err){
                callback(new Error("Unknown error"));
                return;
            }
           
            callback(null, review);
            return
        })
    }
    deleteReview(reviewId, callback){
        this.collection.deleteOne({"_id": new ObjectId(reviewId)},(err, data)=>{
            if(err){
                callback(new Error("Unknown Error"));
                return;
            }
            callback(null,data);
        })
    }
}
module.exports = ReviewMannager;