import React, { useEffect, useState } from 'react';
import Card from './Card';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';


function Postoverview() {
    const [allposts, setAllPosts] = useState([]);

    const CONFIG_OBJ={
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer"+ localStorage.getItem("token")
        }
      }
    const getAllPosts = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`);
        if (response.status === 200) {
            setAllPosts(response.data.posts);
        } else {
            Swal.fire({
                icon: "error",
                title: "Some error occured while getting all posts"
            })
        }
    }
    
    const deletePost = async (postId) => {
        const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
        if (response.status === 200) {
            getAllPosts();
        }
    }

    useEffect(() => {
        getAllPosts();
    }, []);
    return (
        <div className='container'>
            <div className='row mt-3'>
            {allposts.map((post,key) => {
                        return (
                            <div key={key} className='col mb-3'>
                                <Card postData={post} deletePost={deletePost} getAllPosts={getAllPosts}/>
                            </div>
                        )

                    })}
            </div>
        </div>
    )
}

export default Postoverview
