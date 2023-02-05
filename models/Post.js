const { Schema, model } = require('mongoose')

const PostSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content:  {
        type: String,
        required: true
    },
    date:  {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        default:'default.png'
    }
})

//Model name, schema , collection in the db
module.exports = model('Post',PostSchema,'posts')