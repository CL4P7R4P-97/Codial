const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index =  async function(req, res){

 
        try{

            let posts =  await Post.find({})
            .sort({createdAt: -1})
            .populate('user')
            .populate({
             path:'comments',
             populate: {
                 path:'user',
                 model: 'User'
             }
            });
            

         return res.json(200 , {
            message: 'List of posts',
            posts: posts
        })
     
       
             
       }
     
       catch(err){
        return res.json(500 , {
            message: 'Error occurred',
            error: err
        })
       }
         

  
}

module.exports.delete = async function(req, res){

 console.log(req.params);
try{
    let post = await Post.findById(req.params.id);

    //.id will be converted to string
  
    if(post.user == req.user.id){

        post.remove();

      await Comment.deleteMany({post: req.params.id});
        return res.status(200).json({
        data: {
            post_id: req.params.id
        },
        message: 'post deleted'
        });
    }
    else{

        return res.json(401, {
            message: "You can't delete"
        });
    }
    }


catch(err){

   console.log(err);
    return res.json(500 , {
        message: 'Error occurred',
        error: err
    })
}
             
 
}