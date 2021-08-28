const mongoDB = require('../../database/mongoDB')
const jwt = require('jsonwebtoken')

class AuthController {
    get_token = async (_id, res) => {
        let accessToken = jwt.sign({ _id: _id }, process.env.SECRET_JWT, {
            expiresIn: '6h',
        });
        let refreshToken = jwt.sign({ _id: _id }, process.env.SECRET_JWT_REFRESH, {
            expiresIn: '7 days',
        });
        res.cookie('accountID', accessToken, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            signed: true,
            httpOnly: true
        });
        return { accessToken, refreshToken }
    }
    register = async (req, res, next) => {
        try {
            let newAccount = {
                ...req.body,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: 0,
            }
            //Câu lệnh siêu hay: check xem có tồn tại không. Và chỉ set khi upsert => chất lừ
            let result = await mongoDB.getDB().collection('users').updateOne(
                { $or: [{ email: req.body.email }, { username: req.body.username }] },
                { $setOnInsert: newAccount },
                { upsert: true }
            )
            if (!result.upsertedId) throw new Error('Error ... !')
            let token = await this.get_token(result.upsertedId, res)
            res.json({ data: result, ...token });
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }
    login = async (req, res, next) => {
        try {
            let user = await mongoDB.getDB().collection('users').findOne({
                email: req.body.email,
                password: req.body.password,
            });
            if (!user) throw new Error('Error ... !')
            let token = await this.get_token(user._id, res)
            res.json({ data: user, ...token });
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }
    logout = async (req, res, next) => {
        try {
            res.clearCookie('accountID');
            res.json({ data: "success" })
        } catch (error) {
            console.log(error);
            res.json({ error: error });
        }
    }
    refreshToken = async (req, res, next) => {
        try {

        } catch (error) { }
    }
}

module.exports = new AuthController()
