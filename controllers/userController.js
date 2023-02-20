const User = require('../models/user');

module.exports.profile = function(req,res){


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

User.findById(req.params.id, function(err, user){

    if(err){
        return res.redirect('/');
    }
    
    return res.render('profile',{title: "Profile", profile_user: user});
})

}

module.exports.login = function(req,res){

    if(req.isAuthenticated()){

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
            console.log("Error finding user!");
            return res.redirect('back');
        }

        if(!user){
            if(req.body.confirmPassword != req.body.password){
                console.log("Wrong password");
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
                        
                    }
                    else{
                        console.log(user);
                    console.log("User created");
                    }
                    
                });
                
            }
        }
        else{

           console.log("user exists already!");
           return res.redirect('back');
        }
        return res.redirect('/user/login');
    });

   
}

module.exports.destroySession  = function(req,res){

    //previously it was normal function but now its async function 
    req.logout(function(err){
        console.log(err || "Logged out");
    })
    return res.redirect('/');
}

module.exports.edit = function(req,res){

   return res.end('<h1>Edit</h1>');
}

module.exports.otherUserProfile = function(req,res){

    User.findById(req.params.userId, function(err, user){

        if(err){
            console.log(err);
            res.redirect('/');
        }

        return res.render('profile',{title: user.name, profile_user: user} );
    
        
    });

}


module.exports.updateProfile = function(req,res){

    if(req.user.id == req.params.userId){

        User.findByIdAndUpdate(req.params.userId, {name: req.body.name, email: req.body.email}, function(err, data){
            if(err){
                console.log("err while updating");
                return res.redirect('/');
            }

            console.log(data);
            return res.redirect('/');
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}