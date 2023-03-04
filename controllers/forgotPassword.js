const resetPass = require('../models/password');
const User = require('../models/user');
const resetPassMailer = require('../mailers/forgetPassword');
const crypto = require('crypto');

module.exports.resetPage = function (req, res) {

    return res.render('forgotPassword', {
        title: 'Forgot Password'
    });
}



module.exports.sendLink = async function (req, res) {

    try {

        //returning the arrray
        let fUser = await User.find({
            email: req.body.email
        });
        console.log(fUser);
        let resetObject = new resetPass({
            accessToken: crypto.randomBytes(20).toString('hex'),
            is_Valid: true,
            user: fUser[0]._id
        })
        console.log(fUser);
        let resPass = await resetPass.create(resetObject);

        console.log(resPass);
        tokenObj = await User.populate(resPass, {
            path: "user",
            model: "User"
        });
        resetPassMailer.sendLink(tokenObj);
        req.flash('success', 'Reset Link sent!');
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }

}


module.exports.finalReset = async function (req, res) {

    try {
        console.log("inside finalReset");
        console.log(req.params.token);
        let obj = await resetPass.find({
            accessToken: req.params.token
        });
        obj = await resetPass.populate(obj[0], {
            path: 'user',
            model: 'User'
        });
        console.log(obj);
        if (obj) {

            if (obj.is_Valid) {
                return res.render('finalPassReset', {
                    token: obj.accessToken,
                    title: 'Reset Password'
                });
            } else {
                req.flash('error', 'Link is invalid or expired');
                return res.redirect('/');
            }


        }
        req.flash('error', 'Link is invalid or expired');
        return res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

module.exports.completion = async function (req, res) {

    try {

        if (req.body.pass1 === req.body.pass2) {

            console.log(req.params.token);
            let obj = await resetPass.findOne({
                accessToken: req.params.token
            });
            console.log(obj);
            let fullObj = await resetPass.populate(obj, {
                path: "user",
                model: "User"
            });
            console.log(fullObj);
            await resetPass.updateOne({
                accessToken: req.params.token
            }, {
                is_Valid: false
            });
            console.log(fullObj.user._id);
            await User.findByIdAndUpdate(fullObj.user._id, {
                password: req.body.pass2
            });
            req.flash('success', 'password changed');
            res.redirect('/');

        } else {

            req.flash('error', 'Both  passwords should be same');
            return res.redirect('back');
        }




    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

}