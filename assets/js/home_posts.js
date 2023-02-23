{

    //Sending data through ajax

    console.log("R U N N I N G");

    

    let createPost = function(){

        let postForm = $('#new-postForm');

        postForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postForm.serialize(),

                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container').prepend(newPost);
                    new Noty({
                        theme : 'mint' , 
                        text: "Post Created",
                        type: 'alert',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                    //.delete-post-button inside newPost
                    deletePost($( '.delete-post-button', newPost));
                },
                error: function(error){
                    new Noty({
                        theme : 'relax' , 
                        text: error.responseText,
                        type: 'warning',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                    console.log(error.responseText);
                }
            });
        });
    }


    //method to create DOM

    let newPostDom = function(post){
        return $(`
        
        
<div id="post-${ post._id }">

<p>${post.user.name}</p>
<a href="/posts/deletePost/${post._id}" class="delete-post-button">(X)</a>

<div> ${post.content }</div>


<form action="/posts/comment/${ post._id }" method="post">
<textarea name="content" id="" cols="10" rows="1" placeholder="comment here" required></textarea>
<input type="hidden" name="post" value="${ post._id }">
<input type="hidden" name="postUser" >
<input type="submit" value="Add Comment">
</form>

 
</div>        
        `)
    }  
                                                     
    // method to delted post

    // ajax request is sent to delete post and after we get response with postId under success key and we remove that post with that Id 
    let deletePost = function(deleteLink){

        $(deleteLink).click(function(e){

            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                     $(`#post-${data.data.post_id}`).remove();
                     new Noty({
                        theme : 'relax' , 
                        text: "Post Deleted",
                        type: 'warning',
                        layout : "topRight",
                        timeout : 1500
                        
                        }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }






    createPost();

}