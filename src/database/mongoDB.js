const MongoClient = require('mongodb').MongoClient
let _mongodb

let connect = async (uri, dbname) => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    try {
        let client = new MongoClient(uri, options)
        let _connection = await client.connect()
        _mongodb = _connection.db(dbname)
        console.log('\x1b[33m' + 'MongoDB: ' + 'connect successfully !!!' + '\x1b[0m')
    } catch (error) {
        console.log('\x1b[33m\x1b[41m' + 'MongoDB: ' + error + '\x1b[0m')
    }
}

let getDB = () => {
    return _mongodb
}

module.exports = {getDB, connect}
