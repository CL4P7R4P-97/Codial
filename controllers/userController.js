const User = require('../models/user');
const fs = require('fs');
const path = require('path');
module.exports.profile = async function(req,res){


//    if(req.cookies.user_id){
 
//     User.findById( req.cookies.user_id, function(err,user){

//         if(err){
//             console.log("error occured at db");
//            return res.redirect('/user/login');
//         }

//         if(user){
            
//           return res.render('profile', {title: user.name +"'s profile"});
//         }
//         else{
//             console.log("Unauthorized access");
//             return res.redirect('/user/login');        }
//     });

//   

try{
    let user = await User.findById(req.params.id);
return res.render('profile',{title: "Profile", profile_user: user});
}
catch(err){
    console.log(err);
}

}

module.exports.login = function(req,res){

    if(req.isAuthenticated()){

        req.flash('success', 'Logged in successfully');

        return res.render('home',{title: "Home"});
    }

    return res.render('login', {title: "Codial-Login"});
}


module.exports.createSession = function(req,res){

// res.cookies = User.find({email:req.body.email},
//     function(err,data){
//         if(err){
//             console.log("User not found");
//             return res.redirect('back');
//         }
//         if(data){

//             console.log(data);
//             if(req.body.password != data[0].password){
//                 console.log("Wrong password");
//                 return res.redirect('back');
//             }

//             res.cookie('user_id', data[0].id);
//             return res.redirect('/user/profile');
//         }
//     })
    console.log("loggedIN");
req.flash('success', 'LoggedIn successfully');

            return res.redirect('/');
} 


module.exports.signup = function(req,res){

    if(req.isAuthenticated()){



        return res.render('home',{title: "Home"});
    }
    return res.render('signup', {title: "Codial-Login"});
}

module.exports.createUser = function(req,res){

    if(req.isAuthenticated()){

        return res.redirect('home',{title: "Home"});
    }

    User.findOne({
        email: req.body.email,
          
    },function(err,user){
 
        if(err){
            req.flash('error','Error finding user!');
            console.log("Error finding user!");
            return res.redirect('back');
        }

        if(!user){
            if(req.body.confirmPassword != req.body.password){
                req.flash('error','Both passwords should match!');
                return res.redirect('back');
            }
            else{
              
                User.create({
                    name: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }, function(err,user){
                    if(err){
                        console.log(err + "Error occurred while creating user!");
                        return res.redirect('back');
                    }
                    else{
                        req.flash('success','Account created!');
                    console.log("User created");
                    return res.redirect('back');
                    }
                    
                });
                
            }
        }
        else{

            req.flash('success','Account already exists!');
           console.log("user exists already!");
           return res.redirect('back');
        }
        return res.redirect('/user/login');
    });

   
}

module.exports.destroySession  = function(req,res){

    //previously it was normal function but now its async function 
   
   
    req.logout(function(err){
        console.log(err );
    });
    req.flash('success', 'LoggedOut successfully');
    console.log("loggedOut");
    return res.redirect('/');
}

module.exports.edit = function(req,res){

   return res.end('<h1>Edit</h1>');
}

module.exports.otherUserProfile = async function(req,res){

  try{
    let user = await User.findById(req.params.userId);

    return res.render('profile',{title: user.name, profile_user: user} );
  }
  catch(err){

    console.log(err);
  }
}


module.exports.updateProfile = async function(req,res){

    // if(req.user.id == req.params.userId){

    //     User.findByIdAndUpdate(req.params.userId, {name: req.body.name, email: req.body.email}, function(err, data){
    //         if(err){
    //             console.log("err while updating");
    //             req.flash('error','Something went wrong!');
    //             return res.redirect('/');
    //         }
    //         req.flash('success','Profile updated!');
    //         console.log(data);
    //         return res.redirect('/');
    //     });
    // }
    // else{
    //     req.flash('error','Not allowed');
    //     return res.status(401).send('Unauthorized');
    // }


    if(req.user.id == req.params.userId){

        try{

             let user = await User.findById(req.params.userId);
             User.uploadedAvatar(req,res,function(err){
                if(err){

                    console.log("Multer Error", err);
                    return res.redirect('/');
                }

                // console.log(req);
                user.name = req.body.name;
                user.email = req.body.email;
                console.log(req.file);
                if(req.file){
                    console.log("saving file");
                    if(user.avatar){

                       try{
                        fs.unlinkSync(path.join(__dirname, '..',user.avatar));
                       }
                       catch(err){
                        console.log("file not present but registered");
                        req.flash('success','Profile updated');
                        
                       }
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                else{
                    console.log("File Missing");
                    return res.redirect('/');
                }
                user.save();
               res.redirect('/');
             })

        }
        catch(err){

            console.log("err while updating");
                req.flash('error','Something went wrong!');
                return res.redirect('/');
        }
    }
    else{

        req.flash('error','Not allowed');
      return res.status(401).send('Unauthorized');
    }

}