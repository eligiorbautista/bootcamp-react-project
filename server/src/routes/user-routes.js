const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user-model');
const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

const mongooseConnectionString = process.env.DATABASE_URL;
mongoose.connect(mongooseConnectionString)
.then(() => {
    console.log('Connected to MongoDB ✔')
})
.catch((err)=>{  
    console.log(err,": An error occured ✖")
});

router.use(bodyParser.json());


router.post('/users', (req,res) => {
    const { firstName, lastName, email, password } = req.body;
    // Send email notification
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kape.espresso.express@gmail.com',
        pass: 'dvgrroasdpynyapf'
      }
    });
    
    var mailOptions = {
      from: 'kape.espresso.express@gmail.com',
      to: email,
      subject: 'Account Registration',
      text: `Good Day! ${firstName} ${lastName},\nYou have successfully registered your account to our database.`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
    // Post
    const newUser = new User( { firstName, lastName, email, password } )
    newUser.save()
    .then((user) => {
        res.status(201).json({
             message : 'User has been successfully added.',
             result : user
            })
    })
    .catch((err) => {
         res.status(500).json({
             error : err.message 
            })
    });
});

// router.post('/users', async (req,res) => {
//     try {
//         const users = await User.find();
//         res.status(201).json({
//             message : 'User has been successfully added.',
//             result : user
//         })
//     }
//     catch(err) {
//         res.status(500).json({
//             error : err.message 
//         })
//     }
// });




router.get('/users', (req,res) => {
    // Get
    User.find()
    .then((users) => {
        res.status(201).json({
            message : 'Sucessfully retreived users',
            result : users
        })
    })
    .catch((err) => {res.status(500).json({
        message : err.message
        })
    });
});

router.get('/users/:id', (req,res) => {
    // Get one
    const id = req.params.id;
    User.findById(id)
    .then((users) => {
        res.status(201).json({
            message : 'Sucessfully retreived users',
            result : users
        })
    })
    .catch((err) => {res.status(500).json({
        message : err.message
        })
    });
});


router.put('/users/:id', (req,res) => {
    // Update
    const id = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    // const salt = bcrypt.genSalt(10, password.toString());
    // const encryptedPassword = bcrypt.hash(password.toString(), salt);
    // const newPassword = encryptedPassword.toString();
    User.findByIdAndUpdate(id, {firstName, lastName, email, password}, {new: true})
    .then((user) => {
        if(!user) {
            return res.status(404).json({ message: 'User not found; User doesn\'t exist'})
        }
        res.status(200).json({ message: 'User has been successfully updated.' })
    })
    .catch((err) => {
        res.status(500).json({message : err.message});
    })
});


router.delete('/users/:id', (req,res) => {
    // Delete
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then((user) => {
        if (!user){
            res.status(404).json({
                 message : 'User doesn\'t exist'
            })
        }
        res.status(200).json({
            message : 'User has been successfully deleted.'
        })
         
    })
    .catch(() => {res.status(500).json({
        message : 'An error occurred'
        })
    });
});

// Token
router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if (!user){
            res.status(404).json({message : 'User not found!'})
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
            if(isValid){
                const payload = {username : user.username};
                const token = jwt.
                res.status(200).json({message : 'Log In success!'})
            }
            else {
                res.status(404).json({message : 'Incorrect email/password.'})
            }
        })
        res.status(200).json({message : 'User found!'})
    } catch (error) {
        res.status(500).json({
            message : error
            })
    }
})

module.exports = router;
