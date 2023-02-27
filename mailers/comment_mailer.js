const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {

    console.log(comment);
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({

        from: 'ashish9780kumar@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published!",
        html: '<h1> Your comment is published!'
    }, (err,info)=>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('mail sent', info);
        return ;
    })
}