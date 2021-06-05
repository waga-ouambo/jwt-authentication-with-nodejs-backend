const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;

let _db;

const connectMongo = (callback) => {
    mongoClient.connect('mongodb+srv://danny:cesame@cluster0.irbia.mongodb.net/<dbname>?retryWrites=true&w=majority')
.then(client => {
    console.log('Database Mongo Connected !!!'); 
    _db = client.db();
    callback();
})
.catch(error => {
    console.log(error)
    throw error();
    
})

}

const getDb = () => {
    if(_db){
        return _db
    }
    throw 'NO DATABASE FOUND';
}




// module.exports = connectMongo;

exports.getDb = getDb;
exports.connectMongo = connectMongo;