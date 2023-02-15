const express = require('express');
const port = 8000;
const app = express();
const fs = require('fs');
const path =  require('path');
const expressLayouts = require('express-ejs-layouts'); 
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
 app.use('/', require('./routes') );


app.listen(port, function(err){
    if(err){
     console.log(`Server error, can't start! : ${err}`);
     return;
    }
    console.log(`Server running on port: ${port}`);

});

