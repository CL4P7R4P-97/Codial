const post = require('../models/post');
const comment = require('../models/comment');
const User = require('../models/user');
module.exports.home = async function(req,res  ){


    
  try{

    let posts =  await post.find({})
    .populate('user')
    .populate({
     path:'comments',
     populate: {
         path:'user',
         model: 'User'
     }
    });
    
 
   let users = await User.find({});
     
   return res.render('home',{title:"Codial | Home", posts: posts, users: users});
    
   
  }
  catch(err){

    console.log(err);
    return;
  }
    
}

