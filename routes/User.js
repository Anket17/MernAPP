const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
//const User = require('./models/Todo');
//const Todo = require('../models/Todo');

const signToken = userID =>{
    return JWT.sign({
        iss:"AnketN",
        sub : userID
    }, "AnketN", {expiresIn: "1h"});
}

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

userRouter.post('/login', passport.authenticate('local', {session:false}), (req,res)=>{
    if(req.isAuthenticated()){
        const {_id, username, role}=req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly:true, sameSite: true});
        res.status(200).json({isAuthenticated : true, user:{username,role}});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', {session:false}), (req,res)=>{
    res.clearCookie('access_token');
    res.json({user :{username : "", role : ""}, success : true});
});

userRouter.get('/admin', passport.authenticate('jwt', {session:false}), (req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message :{msgBody : 'you are an Admin', msgErrpr : false}});
    }
    else{
        res.status(403).json({message :{msgBody : 'you are not an Admin, go away', msgErrpr : true}});
    }
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session:false}), (req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true , user :{user : username, role }});
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