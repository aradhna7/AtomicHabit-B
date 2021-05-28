const mongoose = require('mongoose')

const activitySchema= mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now
    }
})

const Activity = mongoose.model('activity', activitySchema )
module.exports = Activity