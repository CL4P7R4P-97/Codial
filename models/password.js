const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({

  

    accessToken:{
        type: String,
        required:true
        
    },

    

    is_Valid:{
        type: Boolean,
        required: true
        
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        
    }
   
   
}, 
{
    timestamps: true
});

const Password = mongoose.model('Password', resetPasswordSchema);
module.exports = Password;