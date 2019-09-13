const express = require('express');
const router = express.Router();
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const EmployeeManager = require('../src/DatabaseHelpers/EmployeeManager');
const CompanyManager = require('../src/DatabaseHelpers/CompanyManager');
const employeeInstance = new EmployeeManager();
const reviewInstance = new ReviewManager();
const companyInstance = new CompanyManager();

router.post('/addReview', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        let companyId = req.session.companyId;
        let reviewHeading = req.body.reviewHeading;
        let description = req.body.description;
        let rating = req.body.rating;
        let userId = req.session.user;
        reviewInstance.addReview(userId, companyId, reviewHeading, description, rating, (err, reviewId) => {
            if (err) {
                res.send(err.message)
            }
            employeeInstance.addReviewIdInReviews(userId, reviewId, (err, data) => {
                if (err) {
                    res.status(500).json(new Error("unknown error"))
                    return
                }
            })

            companyInstance.addReviewIdInCompany(companyId, reviewId, (err, company) => {
                if (err) {
                    res.status(500).json(new Error("unknown error"))
                    return
                }
                res.status(201).redirect("/company/" + companyId);
            })
        })
    }
});

router.get('/addReview/:companyId', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        req.session.companyId = req.params.companyId;
        res.render('addReview.hbs', {
            title: "Add review",
            login: "login",
            profile: "/employee/profile/" + req.session.user,
            script: "addReview.js",
            styles: "addReview.css"
        })
    } else {
        res.redirect('/employee/login')
    }
})


router.put('/edit/:reviewId', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        reviewInstance.editReview(req.params.reviewId, req.body, (err, data) => {
            if (err) {
                res.send(err);
                return
            }
            res.send("/employee/profile/" + req.session.user);
            return
        })
    } else {
        res.status(401).send({
            Error: "Access Denied"
        })
    }
})
router.get('/edit/:reviewId', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        reviewInstance.getReviewFromReviewId(req.params.reviewId, (err, review) => {
            if (err) {
                console.log(err)
                res.status(401).send(err.message)
                return
            }
            const userId = review.review.userId
            if (req.session.user === userId) {
                res.render('editReview.hbs', {
                    title: "Edit Review",
                    styles: "editReview.css",
                    script: "editReview.js",
                    "login": "login",
                    "review": review,
                    profile: "/employee/profile/" + userId
                })

                return;
            } else {
                res.status(401).send({
                    Error: "Access Denied"
                })
            }
        })

    } else {
        res.status(401).json({
            Error: "Access Denied"
        });
        return
    }
})

router.delete('/:reviewId', (req, res) => {
    // if(req.session.user && req.session.loggedIn){
    let reviewId = req.params.reviewId;
    reviewInstance.getReviewFromReviewId(reviewId, (err, review) => {
        if (err) {
            res.status(401).send(err.message);
            return
        }

        let userId = review.review.userId
        let companyId = review.review.companyId;
        reviewInstance.deleteReview(reviewId, (err, response) => {
            if (err) {
                res.send(err.message);
                return;
            }
            employeeInstance.deleteReviewId(userId, reviewId, (err, response) => {
                if (err) {
                    res.send(err)
                    return
                }
                res.json(response)
            })
        })
        return;
    })
    // }
    // else{
    //     res.status(401).json({
    //         Error: "Access Denied" });
    //         return
    // }

})


module.exports = router;