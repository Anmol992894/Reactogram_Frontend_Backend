// const mongoose=require('mongoose');
// const {ObjectId}=mongoose.Schema.Types;

// const postSchema=new mongoose.Schema({
//     description:{
//         type:String,
//         required:true
//     },
//     location:{
//         type:String,
//         required:true
//     },
//     image:{
//         type:String,
//         required:true
//     },
//     author:{
//         type:ObjectId,
//         ref:"UserModel"
//     }
    
// })

// mongoose.model("PostModel",postSchema);



const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            // To get who liked the post
            ref: "UserModel"
        }
    ],
    comments: [
        {
            commentText: String,
            commentedBy: { type: ObjectId, ref: "UserModel" }
        }
    ],
    image: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
});

mongoose.model("PostModel", postSchema);