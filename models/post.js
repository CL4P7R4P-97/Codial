const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    post:{
        type: String,
        required: true,
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
   
}, 
{
    timestamps: true
});

const post = mongoose.model('Post', postSchema);
module.exports = post;