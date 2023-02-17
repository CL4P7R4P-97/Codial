const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const user = require('../models/user');


passport.use(new localStrategy({

    usernameField: 'email'
},

function(email, password, done){

    

    user.find({email: email},
        function(err,user){

            if(err){
                console.log("error finding user!");
                return done(err,false);
            }

          
            if(!user || user[0].password != password){
                console.log("Invalid username");
                //no error but authentication failed!
                return done(null, false);
            }

            //returned to serializer
            return done(null, user);
        });
}

));

passport.serializeUser(function(user,done){

    //sending user id to cookie
   
    done(null,user[0]._id);
});

passport.deserializeUser(function(id, done){


    //deserializing cookie to identify user
    user.findById(id, function(err,user){

        if(err){
            console.log("Error in finding user--> passport");
            return done(err,false);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req,res,next){

   
    //isAuthenticated is the method attached by passport over request
  
    console.log("---------checking user in request------------------");
    console.log(req.user);
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        console.log("auth successful");
       next();
    }

    else{
        return res.redirect('/user/login');
    }
}

passport.setAuthenticatedUser = function(req,res,next){

   
    if(req.isAuthenticated()){
       
      
    
        res.locals.user = req.user;
    }  

   
 return next();
}


module.exports = passport;