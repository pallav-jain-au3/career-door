var express = require('express')
var router = express.Router();
const EmployeeUserManager = require('../src/DataBaseHelpers/UserEmplyoeeManager');
const EmployeeManager = require('../src/DatabaseHelpers/EmployeeManager');
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const reviewInstance = new ReviewManager();
const employeeUserInstance = new EmployeeUserManager();
const employeeInstance = new EmployeeManager();


router.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let email = req.body.email;
    let city = req.body.city;
    let country = req.body.country;
    if (!validateInput(username, password)) {
        res.status(422).send(err.message);
    }
    employeeUserInstance.createNewEmployeeUser(username, password, (err, data) => {
        if (err) {
            res.status(409).send(err.message);
            return;
        }
        let id = data
        employeeInstance.createEmployee(id, username, firstname, lastname, gender, email, city, country, (err, employData) => {
            if (err) {
                res.status(409).send(err.message);
                return
            }
            req.session.user = id;
            req.session.loggedIn = true;
            res.send('/employee/profile/' + id);
        })

    });
});


router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    employeeUserInstance.loginUser(username, password, (err, data) => {
        if (err) {
            res.status(401).send(err.message);
            return;
        }
        let id = data;
        req.session.user = id;
        req.session.loggedIn = true;
        if (req.session.companyId){
            console.log(req.session.companyId)
            res.send('/review/addReview/'+ req.session.companyId);
            return;
        }
        res.send('/employee/profile/' + id);
    })
});

router.get('/profile/:userId', ( req, res) => {
    let id = req.params.userId;
    if (req.session.user === req.params.userId && req.session.loggedIn) {
        employeeInstance.getEmployee(id, (err, employee) => {
            if (err) {
                res.status(500).send(new Error("unknown error"));
            }
            reviewInstance.getReviewOfEmployee(id, (err, reviews) => {
                if (err) {
                    console.log(err)
                }
                if (reviews) {
                    
                    res.render('employeeProfile.hbs', {
                        title: "Employee Profile",
                        employee: employee,
                        login: "login",
                        reviews: reviews,
                        styles: "employeeProfile.css",
                        script: "employeeProfile.js"
                    })
                } else {
                    res.render('employeeProfile.hbs', {
                        title: "Employee Profile",
                        employee: employee,
                        login: "login",
                        styles: "employeeProfile.css",
                        profile:"/employee/profile/" + id,
                        script: "employeeProfile.js"
                    })
                }
            });

        })
    } else {
        res.redirect('/employee/login')
    }
})

router.get('/login', (req, res) => {
    res.render('loginEmployee.hbs', {
        title: "Login Employee",
        styles: "loginEmployee.css",
        script: "loginEmployee.js"
    })
});

function validateInput() {
    //validates input
    return true;
}
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/employee/login')

});

router.get('/signup', (req, res) => {
    res.render('employeeSignup.hbs', {
        title: "Employee Signup",
        styles: "employeeSignup.css",
        script: "employeeSignup.js"

    })
})





module.exports = router;