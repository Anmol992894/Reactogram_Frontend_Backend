const express=require('express');
const router=express.Router();
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const UserModel=mongoose.model("UserModel");
const {JWT_TOKEN, JWT_SECRET}=require('../config');


router.post("/signup",(req,res)=>{
    const {fullName,email,password,profileImg}=req.body;
    if (!fullName || !password || !email) {
        res.status(400).json({error:"One or more mandatory fields are empty"})
    }

    UserModel.findOne({email:email})
    .then((userInDB)=>{
        if(userInDB){
            res.status(500).json({error:"User already exist"})
        }
        bcryptjs.hash(password,16)
        .then((hashedpassword)=>{
            const user=new UserModel({fullName,email,password:hashedpassword,profileImg});
            user.save()
            .then((newUser)=>{
                res.status(201).json({result:"User Signed in Successfully"});
            })
            .catch((err)=>{
                console.log("Appolo");
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
});

// router.post("/login",(req,res)=>{
//     const {email,password}=req.body;
//     if (!password || !email) {
//         res.status(400).json({error:"One or more mandatory fields are empty"})
//     }

//     UserModel.findOne({email:email})
//     .then((userInDB)=>{
//         if(!userInDB){
//             res.status(401).json({error:"Invalid email"})
//         }
//         bcrypt.compare(password,userInDB.password)
//         .then((didmatch)=>{
//             if(didmatch){
//                 const jwt_token=jwt.sign({_id: userInDB._id}, JWT_SECRET);
//                 const userInfo={"email":userInDB.email,"FullName":userInDB.fullName}
//                 res.status(200).json({result:{token:jwt_token,user:userInfo}});
//             }else{
//                 res.status(401).json({error:"Wrong Password"})
//             }
//         }).catch((err)=>{
//             console.log(err);
//         })

//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// });

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "fullName": userInDB.fullName };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});
module.exports=router;