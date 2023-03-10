const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {

    console.log(comment + " " + "from nodemailer");
    //previous path part is there in mailers/comment_mailer.js after which this will be appended to send mail accordingly, later
    //- it could be for login or post created or other changes made thus requiring other templates.
   
    let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

   
    nodemailer.transporter.sendMail({

        from: 'ashish9780kumar@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
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