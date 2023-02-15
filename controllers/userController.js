const userSchema = require('../models/user');

module.exports.profile = function(req,res){


   if(req.cookies.user_id){
 
    userSchema.findById( req.cookies.user_id, function(err,user){

        if(err){
            console.log("error occured at db");
           return res.redirect('/user/login');
        }

        if(user){
            
          return res.render('profile', {title: user.name +"'s profile"});
        }
        else{
            console.log("Unauthorized access");
            return res.redirect('/user/login');        }
    });

   }

  else{
    res.redirect('/user/login');
  }

}

module.exports.login = function(req,res){

    return res.render('login', {title: "Codial-Login"});
}


module.exports.createSession = function(req,res){

res.cookies = userSchema.find({email:req.body.email},
    function(err,data){
        if(err){
            console.log("User not found");
            return res.redirect('back');
        }
        if(data){

            console.log(data);
            if(req.body.password != data[0].password){
                console.log("Wrong password");
                return res.redirect('back');
            }

            res.cookie('user_id', data[0].id);
            return res.redirect('/user/profile');
        }
    })
    
} 


module.exports.signup = function(req,res){

    return res.render('signup', {title: "Codial-Login"});
}

module.exports.createUser = function(req,res){

    userSchema.findOne({
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
              
                userSchema.create({
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

module.exports.edit = function(req,res){

   return res.end('<h1>Edit</h1>');
}