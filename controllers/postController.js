const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create  = async function(req,res){



  await  Post.create({
        content: req.body.content,
        user:req.user._id
    });
        return res.redirect('back');
    
    
}


module.exports.comment  = function(req,res){


    Post.findById(req.body.post, function(err,post){

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.body.postUser
            },
              
              function(err,comment){

                post.comments.push(comment);
                post.save();
                res.redirect('/');
              }
            );
        }
    });

}

module.exports.deletePost = function(req,res){

    Post.findById( req.params.id, function(err,post){

        //.id will be converted to string

        console.log(post);
        if(err){
            console.log(err);
            return res.redirect('/');
        }

       
        if((post.user).toString() == (req.user._id).toString()){

            console.log("deleting");
          post.remove();

              Comment.deleteMany({post: req.params.id}, function(err){
               
                if(err){
                    console.log(err);
                    return res.redirect('/');
                }
                return res.redirect('/');
              });

        }else{

            console.log("Not deleted");
            return res.redirect('back');
        }
    })
}


module.exports.deleteComment = function(req,res){

 
    Comment.findById(req.params.id, function(err,comment){
        if(err){
            console.log(err);
            res.redirect('/');
        }
        console.log(comment);
        if((req.user._id).toString() == (comment.user._id).toString() ){
 
            comment.remove();
            return res.redirect('/');
        }
        else{
            console.log("comment not deleted");
            res.redirect('/');
        }
    });

}