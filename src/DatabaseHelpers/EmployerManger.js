class {
    constructor(collectionName){
        this.collectionName = collectionName;
        this.collection = db.collection(this.collectionName);
    }
}