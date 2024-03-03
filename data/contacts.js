const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let contacts;

const initDB = (callback) => {
    if (contacts) {
        console.log('Db is already initialized!');
        return callback(null, contacts);
    }
    MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
        contacts = client;
     callback(null, contacts);
    })
    .catch((err) => {
        callback(err);
    })
};

const getContacts = () => {
    if (!contacts) {
        throw Error('Database not initialized')
    }
    return contacts;
};

module.exports ={
    initDB,
    getContacts
};