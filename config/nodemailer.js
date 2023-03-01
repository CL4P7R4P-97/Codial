const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');



let transporter  = nodemailer.createTransport({

    service: 'gmail',
    //that is google smtp service
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ashish9780kumar',
        pass: 'ubwrowrcvdlgybod'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(

        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err, template){
            if(err){
                console.log(err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {

    transporter : transporter,
    renderTemplate: renderTemplate
}