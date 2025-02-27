// const jwt=require('jsonwebtoken');
// const {JWT_SECRET}=require('../config');
// const mongoose=require('mongoose');
// const UserModel=mongoose.model("UserModel");


// module.exports=(req,res,next)=>{
//     // Getting value from the request
//     const {authorization}=req.headers;
//     // Bearer DFDFDVVDVS
//     if(!authorization){
//         return res.status(401).json({error:"User not logged in"});
//     }
//     // Generating Token
//     const token=authorization.replace("Bearer","");
//     // Verify the token
//     jwt.verify(token,JWT_SECRET, (error,payload)=>{
//         if(error){
//             return res.status(401).json({error:"User not logged in verified"});   
//         }
//         const {_id}=payload;
//         UserModel.findById(_id)
//         .then((dbUser)=>{
//             req.user=dbUser;
//             next();
//         })

//     });
// }


const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config');

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next)=>{
    const {authorization} = req.headers;
    //Bearer fsfsjfsfgjgj
    if(!authorization){
        return res.status(401).json({error: "User not logged in"});
    }
    const token = authorization.replace("Bearer", "");
    jwt.verify(token, JWT_SECRET, (error, payload)=>{
        if(error){
            return res.status(401).json({error: "User not logged in"});
        }
        const {_id} = payload;
        UserModel.findById(_id)
        .then((dbUser)=>{
            req.user = dbUser;
            next();//goes to the next middleware or goes to the REST API
        })
    });
}