const mongoose = require('mongoose')

const VideoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = Video = mongoose.model('Video', VideoSchema, 'videos')