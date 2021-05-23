const mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        lowercase: true,
    },
    book: {
        title: String,
        author: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Form', formSchema)