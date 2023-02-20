const post = require('../models/post');
const comment = require('../models/comment');
const User = require('../models/user');
module.exports.home = function(req,res  ){


    
   post.find({})
   .populate('user')
   .populate({
    path:'comments',
    populate: {
        path:'user',
        model: 'User'
    }
   })
   .exec( function(err,posts){

    if(err){
        console.log(err);
        return res.redirect('/');
    }

    User.find({}, function(err,users){

        if(err){
            console.log(err);
            return res.redirect('/');
        }
        
    console.log(posts.comments);
    return res.render('home',{title:"Codial | Home", posts: posts, users: users});

    });
   });
    
};

