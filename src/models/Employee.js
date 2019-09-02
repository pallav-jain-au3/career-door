class Employee {

    constructor(id, firstname, lastname,gender,email, city, country) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
        this.email = email;
        this.city = city;
        this.country = country;
        this.review = [];
    }

    addReview(id) {
        // adds reviewid to current user's review field in db
    }

}

module.exports = Employee;