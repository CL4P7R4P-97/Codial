const nodemailer = require('../config/nodemailer');

exports.sendLink = (resetToken) => {

    
    //previous path part is there in mailers/comment_mailer.js after which this will be appended to send mail accordingly, later
    //- it could be for login or post created or other changes made thus requiring other templates.
   
    console.log(resetToken);
    let htmlString = nodemailer.renderTemplate({tokenObject:resetToken}, '/resetPass/new_pass.ejs');

   
    nodemailer.transporter.sendMail({

        from: 'ashish9780kumar@gmail.com',
        to: resetToken.user.email,
        subject: "Reset password",
        html: htmlString
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('mail sent', info);
        return ;
    })
}