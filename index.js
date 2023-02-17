const express = require('express');
const port = 8000;
const app = express();
const fs = require('fs');
const path =  require('path');


//for layouts
const expressLayouts = require('express-ejs-layouts'); 
const db = require('./config/mongoose');
//for cookie parsing
const cookieParser = require('cookie-parser');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportt = require('./config/passport-local-startegy');

//for saving user session to prevent server restart auto logout
const mongoStore = require('connect-mongo')(session);

//for stream data extraction
app.use(express.urlencoded());
app.use(cookieParser());

//setting static file location
app.use(express.static('assets'));

//setting up view engine as ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));




//using expressLayouts
app.use(expressLayouts);
//extracting style and scripts from partials and using over layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//main routing file to access other controllers and routes




//cookie initialization 
app.use(session({
    name:'Codial',
    // TODO change while deployment
    secret: 'blackFriday',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'OK');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes') );

app.listen(port, function(err){
    if(err){
     console.log(`Server error, can't start! : ${err}`);
     return;
    }
    console.log(`Server running on port: ${port}`);

});

