const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
        ,unique: true
    },
    password:{
        type:String,
        required: true
    },
    name:{

        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

//important to see the model name 'Name' while using in populate method of mongoose
const User = mongoose.model('User',userSchema);
module.exports = User;