const express = require('express');
const router = express.Router();
const CompanyManager = require('../src/DatabaseHelpers/CompanyManager');
let companyInstance = new CompanyManager();
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const reviewInstance = new ReviewManager();


router.post('/register', (req, res) => {

    let companyName = req.body.companyName;
    let owns = req.body.owns;
    let department = req.body.department;
    let website = req.body.website;
    let numberOfEmployee = req.body.numberOfEmployee;
    let logo = req.body.logo;
    let city = req.body.city;
    let country = req.body.country;
    companyInstance.addCompany(companyName, owns, website, department, numberOfEmployee, logo, city, country, (err, data) => {
        if (err) {
            res.status(500).send({
                Error: err.message
            })
            return;
        }
        res.redirect('/company');
    })
})
router.get('/register', (req, res) => {
    res.render('companyRegister.hbs', {
        title: "Register Company",
        styles: "companyRegister.css",
        script: "companyRegister.js"
    })
})
router.get('/all', (req, res) => {
    companyInstance.getAllCompany((err, data) => {
        if (err) {
            res.status.json({
                "Error": err.message
            });
            return;
        }
        res.json(data)
    })
})

router.get('/', (req, res) => {
    if (req.session.user && req.session.loggedIn){
        res.render('companies.hbs', {
            title: "Company",
            login:"login",
            profile:"/employee/profile/" + req.session.user,
            styles: "companies.css",
            script: "companies.js"
        })
    }
 else{
    res.render('companies.hbs', {
        title: "Company",
        styles: "companies.css",
        script: "companies.js"
    })
 }
});

router.get('/search', (req, res)=>{
  companyInstance.search(req.query.q, (err, data)=>{
     if(err){
         res.status(400).send(err.message);
         return
     }
     res.json(data)
 })
})

router.get('/:companyId', (req, res) => {
    let companyId = req.params.companyId;
    companyInstance.getCompanyById(companyId, (err, company) => {
        if (err) {
            res.status(404).send(err.message);
            return;
        }

        reviewInstance.getReviewByCompanyId(companyId, (err, reviews) => {
            if (err) {
                res.send(err);
                return;
            }
            let AverageRating;
            if (reviews.length != 0) {
                let TotalRating = reviews.map(review => Number(review.review.reviewRating)).reduce((acc, curr, index, array) => {
                    acc += curr
                    return acc;
                })
                AverageRating = Math.round(TotalRating / reviews.length);
            }
            let login = "";
            if(req.session.user && req.session.loggedIn){
                 login = "login"
            }
            res.status(201).render('company.hbs', {
                title: company.companyName,
                styles: "company.css",
                script: "company.js",
                company: company,
                login:login,
                companyId: companyId,
                profile:"/employee/profile/" + req.session.user,
                reviews: reviews,
                AverageRating: AverageRating
            })
        })
    });
})


 
module.exports = router;