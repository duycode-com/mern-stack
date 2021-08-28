const MongoClient = require('mongodb').MongoClient
let _client, _mongodb

let connect = async (uri, dbname) => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        _client = new MongoClient(uri, options)
        await _client.connect()
        _mongodb = _client.db(dbname)
        console.log('\x1b[33m' + 'MongoDB: ' + 'connect successfully !!!' + '\x1b[0m')
    } catch (error) {
        console.log('\x1b[33m\x1b[41m' + 'MongoDB: ' + error + '\x1b[0m')
    }
}

let getClient = () => {
    return _client
}
let getDB = () => {
    return _mongodb
}

module.exports = { getClient, getDB, connect }
