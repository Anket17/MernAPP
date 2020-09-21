const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
//const User = require('./models/Todo');
//const Todo = require('../models/Todo');

userRouter.post('/register',(req,res)=>{
    const {username,password,role}=req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(300).json({message : {msgBody : "Erro has occured", msgErrpr:true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is alreaady taken", msgErrpr:true}});
        else{
            const newUser = new User({username,password,role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Erro has occureddddddd", msgErrpr:true}});
                else
                {
                    res.status(201).json({message : {msgBody : "Account successfully created", msgErrpr:false}});
                }
            });
        }
    });
});

userRouter.get('/api', function(req, res){
    User.find({})
        .exec(function(err,User){
            if(err)
                console.log("error fetching users");
            else
                res.json(User);
        });
});


module.exports = userRouter;