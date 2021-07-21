const express = require('express');
const router = express.Router();
const User= require('../models/User');

router.route('/').get((req,res) => {
    const userid = req.query.userid
    const filter = {
        userid: {"$regex": userid}
    }
    User.find(filter)
            .then(user => res.json(user))
            .catch(err => res.status(400).json('Error:' + err));
    });



router.route('/').put((req,res) => {
        const userid =  req.query.userid;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const contact = req.body.contact;
        const address = req.body.address;
        
        console.log(userid);
        console.log(firstname);
            User.updateOne({userid: userid} , {firstname: firstname, lastname: lastname, email: email, contact: contact, address: address}, 
                function(err, numberAffected, rawResponse) {
                //handle it
             })
            .then(() => res.json('User updated'))
            .catch(err => res.status(400).json('Error:' + err));
    });

module.exports = router;