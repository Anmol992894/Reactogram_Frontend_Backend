import './styling.css'
import logobigscreen from '../images/social-desktop.PNG';
import logosmallscreen from '../images/social-mobile.PNG';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useState } from 'react';


function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const login=(event)=>{
        event.preventDefault();
        setLoading(true);
        const requestdata={email,password};
        axios.post(`${API_BASE_URL}/login`,requestdata)
        .then((result)=>{
            if(result.status == 200){
                setLoading(false);
                localStorage.setItem("token", result.data.result.token);
                localStorage.setItem('user', JSON.stringify(result.data.result.user));
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                setLoading(false);
                navigate('/myprofile');
            }
        })
        .catch((error)=>{
            setLoading(false);
            Swal.fire({
                icon:"error",
                title:"Some Error occured"
            })
            setEmail('');
            setPassword('');
            console.log(error);
        })
    }
    return ( 
        <div className="loginbody align-center">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-7 shadow  d-flex justify-content-center">
                        <img className="login-img " src={logobigscreen}></img>
                        <img className=" p-3  loginsmall-img" src={logosmallscreen}></img>
                    </div>
                    <div className="col-md-5 ">
                        <div className='card shadow text-center'>
                        {loading ? <div className='col-md-12  mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <div className='card-body p-4'>
                                <h3 className='d-flex justify-content-center'><strong>Login</strong></h3>
                                <form onSubmit={(e)=>login(e)}>
                                    <input value={email} type='email' onChange={(ev)=>setEmail(ev.target.value)} className='p-2 login-input form-control mt-3' placeholder='Enter your email'/>
                                    <input value={password} type='password' onChange={(ev)=>setPassword(ev.target.value)} className='p-2 login-input form-control mt-3 ' placeholder='Enter your password'/>
                                    <button type='submit' className="login-button border border-4 bg-info text-white form-control mt-5" >Log in</button>
                                </form>
                                <pre className='mt-3'>---------------Or--------------</pre>
                                <div className='mt-3 mb-5 pb-5'>
                                    Don't have account? <Link to='/signup'>Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Login;