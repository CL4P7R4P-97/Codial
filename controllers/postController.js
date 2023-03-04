const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/likes');
//importing email worker and queue
const commentMailer = require('../mailers/comment_mailer');
const commentMailerWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create = async function (req, res) {



    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        post = await Post.findById(post._id)
            .populate('user');

        //checking if ajax req is there (xml http request)

        if (req.xhr) {
            console.log("has XHR req");
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'post created'
            });
        }


        req.flash('success', 'Posted successfully!')
        return res.redirect('/');
    } catch (err) {
        console.log('error occured' + " " + err);
        req.flash('error', 'Something went wrong while posting!');
        res.redirect('/');
    }


}


module.exports.comment = async function (req, res) {



    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // console.log("controller comment" + " " + comment);
            post.comments.push(comment);
            post.save();

            console.log("populating comment");
            comment = await Comment.populate(comment, {
                path: "user",
                model: "User"
            });
            console.log("population completed");

            let job = queue.create('emails', comment).save(function (err) {
                if (err) {
                    console.log('error', err);
                    return;
                }
                console.log('job enqueued ' + job.id);
            });

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}



module.exports.deletePost = async function (req, res) {

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});


            await Comment.deleteMany({post: req.params.id});
            post.remove();

            


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
            console.log("deleted");
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
    
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err );
        console.log(err);
        return res.redirect('back');
    }
    
}


module.exports.deleteComment = async function (req, res) {


   try {

 
  let comment =  await Comment.findById(req.params.id);
    
        if ((req.user._id).toString() == (comment.user._id).toString()) {

            let postId = comment.post;
            comment.remove();

 
            let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // CHANGE :: destroy the associated likes for this comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});


            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment removed');
            return res.redirect('/');
        } else {
            req.flash('error', 'Something went wrong!');
            console.log("comment not deleted");
            res.redirect('/');
        }
    
    
   } catch (error) {
    console.log(error);
    
    req.flash('error', error);
    return;
   }

}