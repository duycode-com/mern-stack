const mongoose = require('mongoose')

let connect = (uri) => {
    let options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    mongoose
        .connect(uri, options)
        .then(() => console.log('\x1b[33m' + 'Mongoose: ' + 'connect successfully !!!' + '\x1b[0m'))
        .catch((error) => console.log('\x1b[33m\x1b[41m' + 'Mongoose: ' + error + '\x1b[0m'))
}

module.exports = {connect}
