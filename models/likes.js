const mongoose  = require('mongoose');

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId
    },

    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        rePath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;