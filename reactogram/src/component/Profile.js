import React from 'react'
import './profile.css'
import logo from '../images/v2osk-1Z2niiBPg5A-unsplash.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Profile() {
  const navigate = useNavigate();
  const user = useSelector(state => state.userReducer);
  const [image, setImage] = useState({ preview: '', data: '' });
  const [myallposts, setMyAllPosts] = useState([]);
  const [postdetail, setPostDetail]=useState({});


  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showPost, setShowPost] = useState(false);
  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);
  const [index, setIndex] = useState(0);

  const showDetail=(post)=>{
    setPostDetail(post);
  }

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer" + localStorage.getItem("token")
    }
  }
  // const handleImgUpload = async () => {
  //   let formData = new FormData();
  //   formData.append('file', image.data);

  //   const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
  //   return response;
  // }
  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', image.data);

    const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
    return response;
  }
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setImage(img);
  }
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const getMyPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);
    if (response.status === 200) {
      setMyAllPosts(response.data.posts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Some error occured while getting my all posts"
      })
    }
  }

  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);
    if (response.status === 200) {
        getMyPosts();
        setShow(false);
    }
}
  const addPost = async () => {

    if (image.preview === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post image is mandatory!'
      })
    } else if (caption === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post caption is mandatory!'
      })
    } else if (location === '') {
      Swal.fire({
        icon: 'error',
        title: 'Location is mandatory!'
      })
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
      // write api call to create post
      const postResponse = await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ)
      setLoading(false);
      if (postResponse.status == 201) {
        navigate("/posts")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred while creating post'
        })
      }
    }
  }
  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <div>
      <div className='container mt-3 border border-dark bg-light shadow p-4'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='d-flex flex-column profile-flex'>
              <img className='p-2 profile-img' alt='profile-image' src='https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
              <p className='ms-3 fs-5 fw-bold'>{user.user.fullName}</p>
              <p className='ms-3 fs-5 '>{user.user.email}</p>
              <p className='ms-3 fs-5 '>Full Stack Developer</p>
              <p className='ms-3 fs-5 '>Portfolio xxxxxxxxxxxxxxx</p>
            </div>
          </div>
          <div className='col-md-6 d-flex flex-column justify-content-between'>
            <div className='d-flex justify-content-equal'>
              <div className='text-center fw-bold pe-md-5 pe-3'>
                <h4>{myallposts.length}</h4>
                <p>Posts</p>
              </div>
              <div className='bord ps-md-5 ps-3 pe-md-5 pe-3 text-center fw-bold'>
                <h4>20</h4>
                <p>Followers</p>
              </div>
              <div className='bord ps-md-5 ps-2 pe-3 text-center fw-bold'>
                <h4>20</h4>
                <p>Following</p>
              </div>
            </div>
            <div className='d-flex mx-auto mt-3'>
              <button className="buton me-md-3 border border-4 form-control fw-bold fs-6"  >Edit Profile</button>
              <button className="buton me-md-3 border border-4 form-control fw-bold fs-6" onClick={handlePostShow}>Upload Post</button>
            </div>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-12'>
            <hr />
          </div>
        </div>
        <div className='row mt-2'>
          {myallposts.map((post) => {
            return (
              <div className='col-md-4 mt-2 col-sm-12' key={post._id}>
                <div className='card' onClick={handleShow}>
                  <img onClick={()=>showDetail(post)} src={post.image}  alt={post.description}></img>
                </div>
              </div>
            )

          })}
        </div>
          
          {/* <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} onClick={handleShow} alt='nature'></img>
            </div>
          </div> */}
          {/* <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} alt='nature'></img>
            </div>
          </div>
          <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} alt='nature'></img>
            </div>
          </div> */}
        {/* <div className='row '>
          <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} alt='nature'></img>
            </div>
          </div>
          <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} alt='nature'></img>
            </div>
          </div>
          <div className='col-md-4 mt-2 col-sm-12'>
            <div className='card'>
              <img src={logo} alt='nature'></img>
            </div>
          </div>
        </div> */}


        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-6'>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item>
                    <img src={postdetail.image} style={{ height: '200px', width: '100%' }} alt='none' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={logo} style={{ height: '200px', width: '100%' }} alt='none' />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img src={logo} style={{ height: '200px', width: '100%' }} alt='none' />
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-3'>
                    <div className='d-flex'>
                      <img className='mt-2 mx-2 profile-img-small' alt='profile-image' src={logo} />
                    </div>
                  </div>
                  <div className='col-4'>
                    <p className='pt-3 '>
                      <span className='fs-5 fw-bold'>{postdetail.location}</span> <br />
                      <span className='fs-6'>{postdetail.description}</span>
                    </p>
                  </div>
                  <div className='col-5'>
                    <div className="pe-5 me-4 dropdown float-end">
                      <a className="btn" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className='fs-3 float-end text-dark' style={{ transform: 'rotate(90deg)' }}><i className="fa-solid fa-ellipsis-vertical"></i></span>
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#"><i className="px-2 fa-solid fa-pen-to-square"></i>Edit Post</a></li>
                        <li><a onClick={()=>deletePost(postdetail._id)} className="dropdown-item" href="#"><i className="px-2 fa-solid fa-trash"></i>Delete Post</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <span className='p-2 text-muted'>2 hour ago</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12 ms-2'>
                    <p>Lorem Ipsum</p>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6 px-3 d-flex'>
                    <i className="fa-regular fa-heart m-1"></i>
                    <i className="fa-regular fa-comment m-1"></i>
                    <i className="fa-regular fa-paper-plane m-1"></i>
                  </div>
                </div>
                <div className='row ps-2'>
                  <span className='float-end fs-6 fw-bold'>200 likes</span>
                </div>
              </div>

            </div>
          </Modal.Body>
        </Modal>
        <Modal show={showPost} onHide={handlePostClose} size='lg' centered>
          <Modal.Header closeButton>
            <span className='fw-bold fs-5'>Upload Post</span>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-6 col-sm-12'>
                <div className='upload-box'>
                  <div className='dropZoneContainer mx-md-auto ms-3'>
                    <div className='dropZoneOverlay'>
                      {image.preview && <img src={image.preview} width={150} height={150} />}
                      <i className="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload image from computer</div>
                  </div>
                  <div className="input-group mb-3 opacity-0">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                    <input type="file" className="form-control" id="inputGroupFile01" onChange={handleFileSelect} />
                  </div>
                </div>
              </div>
              <div className=' col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
                <div className='row'>
                  <div className='col-sm-12 mb-3'>
                    <div className="form-floating">
                      <textarea onChange={(ev) => setCaption(ev.target.value)} className="form-control" placeholder="Add Caption" id="floatingTextarea"></textarea>
                      <label htmlFor="floatingTextarea">Add Caption</label>
                    </div>
                  </div>
                  <div className='col-sm-12 '>
                    <div className="form-floating mb-3 ">
                      <input onChange={(ev) => setLocation(ev.target.value)} type="text" className="form-control" id="floatingInputGroup1" placeholder="Add location" />
                      <label htmlFor="floatingInputGroup1"><i className="fa-solid fa-location-dot pe-2"></i>Add Location</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  {loading ? <div className='col-md-12  mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div> : ''}
                  <div className='col-sm-12'>
                    <button onClick={addPost} className='custom-btn custom-btn-white float-end'>
                      <span className='fs-6 fw-700'>Post</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>

  )
}

export default Profile
