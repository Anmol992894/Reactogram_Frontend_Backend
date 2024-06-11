import React from 'react'
import './card.css'
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useState } from 'react';


function Card(props) {

    const user = useSelector(state => state.userReducer);
    const [commentBox,setCommentBox]=useState(false);
    const [comment,setComment]=useState(false);
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + localStorage.getItem("token")
        }
    }
    const submitComment=async (postId)=>{
        const request = { "postId": postId, commentText: comment};
        const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
        setCommentBox(false);
    }

    const likeDislikePost = async (postId,type) => {
        const request = { "postId": postId };
        const response = await axios.put(`${API_BASE_URL}/${type}`, request, CONFIG_OBJ);
        if (response.status === 200) {
            props.getAllPosts();
        }
    }


    return (
        <div>
            <div className='card postcard border border-2 border-dark shadow-sm'>
                <div className='card-body px-2'>
                    <div className='row'>
                        <div className='col-6 d-flex'>
                            <img className='p-2 profile-img' alt='profile-image' src='https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                            <div className='d-flex flex-column mt-2 justify-content-center'>
                                <p className='fs-6 fw-bold'>{props.postData.author.fullName}</p>
                                <p className='py-0'>{props.postData.location}</p>
                            </div>
                        </div>

                        {props.postData.author._id == user.user._id ? <div className='col-6'>
                            <span onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} className='dote float-end text-dark pt-3 pe-3'><i className="fa-solid fa-ellipsis-vertical"></i></span>
                        </div> : ""}
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <img className='p-1 border border-rounded img-fluid rounded' alt={props.postData.description} src={props.postData.image} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6 px-3 d-flex'>
                            <i onClick={() => likeDislikePost(props.postData._id, 'like')} className="ps-2 m-1 fs-4 fa-regular fa-thumbs-up"></i>
                            <i onClick={() => likeDislikePost(props.postData._id, 'unlike')} className="ps-2 m-1 fs-4 fa-regular fa-thumbs-down"></i>
                            <i onClick={() => setCommentBox(true)} className="fs-4 fa-regular fa-comment m-1"></i>
                        </div>
                        <div className='col-6'>
                            <span className='float-end fs-5 fw-bold'>{props.postData.likes.length} likes</span>
                        </div>
                    </div>
                    {commentBox ?<div className='row my-2'>
                        <div className='col-8'>
                            <textarea onChange={(e)=>setComment(e.target.value)} className='form-control border border-1 border-dark'></textarea>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-primary' onClick={()=>submitComment(props.postData._id)}>Post</button>
                        </div>
                    </div> : ""}
                    {props.postData.comments.map((comment)=>{
                        return(
                            <div className='row'>
                                <div className='col-12'>
                                    <p>{comment.commentText}-{comment.commentedBy.fullName}</p>
                                </div>
                            </div>
                        )
                    })}
                    <p >2 hour ago</p>
                </div>
            </div>
        </div>

    )
}

export default Card
