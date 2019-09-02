var express = require('express')
var router = express.Router();
const EmployeeUserManager = require('../src/DataBaseHelpers/UserEmplyoeeManager');
const employeeUserInstance = new EmployeeUserManager();

router.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (!validateInput(username, password)) {
        res.send("Invalid input");
    }
    employeeUserInstance.createNewEmployeeUser(username, password, (err, data) => {
        if (err) {
            res.send(err.message);
        }
        res.send(data)
    });
});



router.post('/login', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    employeeUserInstance.loginUser(username, password, (err, data) => {
        if (err) {
            res.send(err.message);
        }
        res.send(data);
    })
})

function validateInput() {
    //validates input
    return true;
}

module.exports = router;