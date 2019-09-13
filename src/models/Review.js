class Review {
    constructor(userId, companyId, reviewHeading, description, reviewRating) {
        this.type = "Review",
            this.userId = userId,
            this.companyId = companyId,
            this.datePublished = new Date(),
            this.reviewHeading = reviewHeading,
            this.description = description,
            this.reviewRating = reviewRating;
    }
}


module.exports = Review;