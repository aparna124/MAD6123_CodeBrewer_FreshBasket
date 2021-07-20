const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedpass)
    {
        if(err)
        {
            res.json({

                error : err
            })
        }

        let user = new User ({

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedpass,
            type: req.body.type
        })
    
        // user.save()
        // then(user =>{
        //     res.json({
    
        //         message: 'User added succesfully'
        //     })
        // })
        // .catch(error => {
    
        //     res.json({
                
        //         message: 'An error occured'
        //     })
        // })
        user.save()
        .then(data => {
    
            res.json(data);
        })
        .catch(err => {
            res.json({Message: err});
        })
    })

}

const login = (req, res, next) =>
{
    var email = req.body.email
    var password = req.body.password

    User.findOne({$or: [{email: email}]})
    .then(user => {
        if(user)
        {
            bcrypt.compare(password, user.password, function(err, result){

                if(err)
                {
                    res.json({

                        error: err
                    })
                }
                if(result)
                {
                    let token = jwt.sign({firstname: user.firstname}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({

                        message: 'Login Succesful!',
                        token
                    })
                }
                else
                {
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            })
        }
        else
        {
            res.json({
                
                message: 'No user found!'
            })
        }
    })
}

module.exports = {
    register, login
}