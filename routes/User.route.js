const express = require('express');
const bcrypt = require('bcrypt');
const { UserRegModel } = require('../models/User.model');
var jwt = require('jsonwebtoken');

const userRouter = express.Router()


userRouter.post('/register', (req,res)=>{
    const {name, email, password, gender} = req.body;
    
    try {
        bcrypt.hash(password, 3, async(err, hash) =>{
            if(err){
                res.status(400).send(err.message)
            }
            else{
                const newUser = new UserRegModel({name, email, gender, password:hash});
                await newUser.save();
                res.status(200).send({msg: "New user registerd"})
            }

        });
    } catch (error) {
        res.status(400).send(error.message)
    }
})

userRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body;
    const user = await UserRegModel.findOne({email});
    if(user){
        try {
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                if(result){
                    const token = jwt.sign({ userName: user.name, userId: user._id }, 'sp4e4');
                    res.status(200).send({msg: "Login Success !!", token:token})
                }
                else{
                    res.status(400).send({msg: "Incorrect password or username"}) 
                }
            });
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
    else{
        res.status(400).send({msg: "Incorrect password or username"})
    }
   
})

module.exports = {
    userRouter
}