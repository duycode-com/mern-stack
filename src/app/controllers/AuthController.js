const mongoDB = require('../../database/mongoDB')
const jwt = require('jsonwebtoken')

class AuthController {
    register = async (req, res, next) => {
        try {
            let newAccount = {
                ...req.body,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: 0,
            }
            let collection = mongoDB.getDB().collection('users');
            let result = collection.updateOne(
                { gmail: req.body.gmail },
                { $setOnInsert: newAccount },
                { upsert: true }
            )
            console.log(result);
        } catch (error) {
            console.log(err);
        }
    }
    login = async (req, res, next) => {
        try {
            let query = {
                email: req.body.email,
                password: req.body.password,
            };
            
            let account = await mongoDB.getDB().collection('users').findOne(query);
            // console.log(account);
            // res.json({account})
            if (account) {
                let accessToken  = jwt.sign({ _id: account._id }, process.env.SECRET_JWT, {
                    expiresIn: '6h',
                });
                let refreshToken  = jwt.sign({ _id: account._id }, process.env.SECRET_JWT_REFRESH, {
                    expiresIn: '7 days',
                });
                res.cookie('accountID', accessToken , {
                    signed: true,
                });
            }

            // res.json({ data: account });
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }
    logout = async (req, res, next) => {
        try {
        } catch (error) { }
    }
    refreshToken = async (req, res, next) => {
        try {
        } catch (error) { }
    }
}

module.exports = new AuthController()
