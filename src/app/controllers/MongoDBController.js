const mongoDB = require('../../database/mongoDB')
const ObjectId = require('mongodb').ObjectId

module.exports = class MongoDBController {
    constructor(name) {
        this.name = name
    }
    list = async (req, res, next) => {
        try {
            let result = await mongoDB.getDB().collection(this.name).find({ removedAt: 0 }).toArray()
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    trash = async (req, res, next) => {
        try {
            let result = await mongoDB.getDB().collection(this.name).find({ removedAt: { $ne: 0 } }).toArray()
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    findID = async (req, res, next) => {
        try {
            let result = await mongoDB.getDB().collection(this.name).findOne({ _id: new ObjectId(req.params._id) })
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    insert = async (req, res, next) => {
        try {
            let result = await mongoDB.getDB().collection(this.name).insertOne({
                ...req.body,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: 0,
            })
            if (!result.acknowledged) throw new Error('Error ... !')
            let data = await mongoDB.getDB().collection(this.name).findOne({ _id: result.insertedId })
            res.json({ data: data })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    update = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).findOneAndUpdate(
                { _id: new ObjectId(req.params._id) },
                { $set: { ...req.body, updatedAt: Date.now() } },
                { upsert: false, returnDocument: 'after' }
            )
            if (!result.ok) throw new Error('Error ... !')
            res.json({ data: result.value })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    replace = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).findOneAndReplace(
                { _id: new ObjectId(req.params._id) },
                {
                    ...req.body,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    removedAt: 0,
                },
                { upsert: false, returnDocument: 'after' }
            )
            if (!result.ok) throw new Error('Error ... !')
            res.json({ data: result.value })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    remove = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).findOneAndUpdate(
                { _id: new ObjectId(req.params._id) },
                { $set: { removedAt: Date.now() } },
                { upsert: false, returnDocument: 'after' }
            )
            if (!result.ok) throw new Error('Error ... !')
            res.json({ data: result.value })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    restore = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).findOneAndUpdate(
                { _id: new ObjectId(req.params._id) },
                { $set: { removedAt: 0, updatedAt: Date.now() } },
                { upsert: false, returnDocument: 'after' }
            )
            if (!result.ok) throw new Error('Error ... !')
            res.json({ data: result.value })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    destroy = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).deleteOne({
                _id: new ObjectId(req.params._id),
                removedAt: { $ne: 0 },
            })
            if (!result.acknowledged) throw new Error('Error ... !')
            result._id = req.params._id
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    //
    insert_list = async (req, res, next) => {
        try {
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    remove_list = async (req, res, next) => {
        try {
            let _ids = req.body._ids.map((item) => new ObjectId(item))
            const result = await mongoDB.getDB().collection(this.name).updateMany(
                { _id: { $in: _ids } },
                { $set: { removedAt: Date.now() } },
                { upsert: false }
            )
            if (!result.acknowledged && result.modifiedCount != req.body._ids.length) throw new Error('Error ... !')
            result._ids = req.body._ids
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    restore_list = async (req, res, next) => {
        try {
            let _ids = req.body._ids.map((item) => new ObjectId(item))
            const result = await mongoDB.getDB().collection(this.name).updateMany(
                { _id: { $in: _ids } },
                { $set: { removedAt: 0 } },
                { upsert: false }
            )
            if (!result.acknowledged && result.modifiedCount != req.body._ids.length) throw new Error('Error ... !')
            result._ids = req.body._ids
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    destroy_list = async (req, res, next) => {
        try {
            let _ids = req.body._ids.map((item) => new ObjectId(item))
            const result = await mongoDB.getDB().collection(this.name).deleteMany({ _id: { $in: _ids } })
            if (!result.acknowledged && result.deletedCount != req.body._ids.length) throw new Error('Error ... !')
            result._ids = req.body._ids
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    destroy_trash = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).deleteMany({ removedAt: { $ne: 0 } })
            if (!result.acknowledged) throw new Error('Error ... !')
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
    destroy_all = async (req, res, next) => {
        try {
            const result = await mongoDB.getDB().collection(this.name).deleteMany({})
            if (!result.acknowledged) throw new Error('Error ... !')
            res.json({ data: result })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }
}