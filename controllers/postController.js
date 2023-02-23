const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create  = async function(req,res){



  try{
   let post = await  Post.create({
        content: req.body.content,
        user:req.user._id
    });

     post = await Post.findById(post._id)
     .populate('user');

    //checking if ajax req is there (xml http request)

    if(req.xhr){
        console.log("has XHR req");
        return res.status(200).json({
        data: {
            post: post
        },
        message: 'post created'
        });
    }
    

    req.flash('success','Posted successfully!')
        return res.redirect('/');
  }

  catch(err){
    console.log('error occured' + " " + err);
    req.flash('error', 'Something went wrong while posting!');
    res.redirect('/');
  }
    
    
}


module.exports.comment  = async function(req,res){


    
    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
         
}  
    


module.exports.deletePost = function(req,res){

    Post.findById( req.params.id, function(err,post){

        //.id will be converted to string

        console.log(post);
        if(err){
            console.log(err);
            req.flash('error','Error occurred')
            return res.redirect('/');
        }

       
        if((post.user).toString() == (req.user._id).toString()){

            console.log("deleting");
          post.remove();

          if(req.xhr){
            console.log("has XHR req");
            return res.status(200).json({
            data: {
                post_id: req.params.id
            },
            message: 'post deleted'
            });
        }

              Comment.deleteMany({post: req.params.id}, function(err){
               
                if(err){
                    req.flash('error','Something went wrong!');
                    console.log(err);
                    return res.redirect('/');
                }
                req.flash('success','Deleted your post');
                return res.redirect('/');
              });

        }else{

             req.flash('error','Something went wrong!');
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
            req.flash('success','Comment removed');
            return res.redirect('/');
        }
        else{
            req.flash('error','Something went wrong!');
            console.log("comment not deleted");
            res.redirect('/');
        }
    });

}