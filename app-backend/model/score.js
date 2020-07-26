const mongoose = require('mongoose')
const Schema = mongoose.Schema
const scoresSchema = Schema({
     username: String,
     corrKey: Number,
     duration: Number,
     keyCounter: Number,
     length: Number,
     incorrectKeys: String,
     wpm: Number,
     eff: Number,
     log_date: {type:Date,default: Date.now}
})

module.exports = mongoose.model('Score',scoresSchema)