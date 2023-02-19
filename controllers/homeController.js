const post = require('../models/post');

module.exports.home = function(req,res  ){


    
   post.find({}).populate('user').exec( function(err,posts){

    if(err){
        console.log(err);
        return;
    }
    return res.render('home',{title:"Codial | Home", posts: posts});
   });
    
};