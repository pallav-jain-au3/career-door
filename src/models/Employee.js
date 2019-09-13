class Employee {

    constructor(id, firstname, lastname,username,gender,email, city, country) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.gender = gender;
        this.email = email;
        this.city = city;
        this.country = country;
        this.reviews = [];
    }

}

module.exports = Employee;