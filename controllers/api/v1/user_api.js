const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try{

        console.log(req);
        console.log(req.body);
        let user = await User.findOne({email: req.body.email});

        console.log(user);
        if(!user || user.password  != req.body.password){

            return res.json(422, {
                message: 'Invalid username or password'
            })
        }


        return res.json(200, {
            message: 'Sign successful',
            data: {
                token: jwt.sign(user.toJSON(), 'codial', {expiresIn: '100000'})
            }
        })

    }

    catch(err){

        console.log(err);
        res.json(500, {
            message: 'Internal server error'
        });
    }
}