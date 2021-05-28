const mongoose = require('mongoose')

const postSchema= mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    image:{
        data: Buffer,
        contentType: String
    },
    likes:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }

    }],
    comments:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        avatar: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
})

const Post = mongoose.model('post', postSchema )
module.exports = Post