const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const USER = mongoose.model("USER")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys");
const requireLogin = require("../middlewares/requireLogin");

router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
    const {name,userName, email, password} = req.body;
    if(!name || !email || !userName || !password) {
        return res.status(422).json({error:"Please all all the fields"})
    }

    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            res.status(422).json({error:"User already exist with that email id or UserName"})
        }
        else{
           // Using bcrypt library to encrypt the password till 12 hashes.
            bcrypt.hash(password,12).then((hashedPassword)=>{
                const user = new USER({
                    name,
                    userName,
                    email,
                    password : hashedPassword
                })

                user.save()
                .then(user=>{res.json({message:"Registered           Successfully"})})
                .catch(err=>{console.log(err)})
            })
          
        }
    })
   
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please add email and password"})
    }
    else{
        USER.findOne({email:email}).then((savedUser)=>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email"})
            }
            bcrypt.compare(password,savedUser.password).then((match)=>{
                if(match) 
                {
                    const token = jwt.sign({_id:savedUser.id},Jwt_secret)
                    console.log(token)
                    //return res.status(200).json("Signed In Successfully")
                    return res.json(token)
                }
                else{
                    return res.status(422).json({error:"Invalid Password"})
                }
            }).catch(err=>console.log(err))
        })
    }
})

module.exports = router;