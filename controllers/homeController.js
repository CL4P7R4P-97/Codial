const post = require('../models/post');
const comment = require('../models/comment');

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
        return;
    }
    console.log(posts.comments);
    return res.render('home',{title:"Codial | Home", posts: posts});
   });
    
};