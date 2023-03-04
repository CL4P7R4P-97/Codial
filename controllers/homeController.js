const Post = require('../models/post');
const comment = require('../models/comment');
const User = require('../models/user');
const { populate } = require('../models/likes');
module.exports.home = async function (req, res) {



  try {

    
 

    let posts = await Post.find({})
    .sort({createdAt: -1})
    .populate('user')
    .populate({
      path: 'comments',
      
      populate: {
        path: 'likes'
      },
      populate: {
        path: 'user'
      }
    })
       
        
    

 
    let users = await User.find({});

    return res.render('home', {
      title: "Codial | Home",
      posts: posts,
      users: users
    });


  } catch (err) {

    console.log(err);
    return;
  }

}