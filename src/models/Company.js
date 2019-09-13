class Company {
    constructor(companyName, owns, website, department, numberOfEmployee, logo, city, country, reviews) {
        this.companyName = companyName;
        this.owns = owns,
        this.department = department,
        this.website = website;
        this.numberOfEmployee= numberOfEmployee;
        this.logo = logo;
        this.city = city;
        this.country = country;
        this.rating;
        this.reviews = []
     }
}

module.exports = Company;