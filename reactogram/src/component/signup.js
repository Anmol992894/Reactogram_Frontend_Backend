import './styling.css'
import logobigscreen from '../images/social-desktop.PNG';
import logosmallscreen from '../images/social-mobile.PNG';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';


function Signup() {
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);

    const signup=(event)=>{
        event.preventDefault();
        setLoading(true);
        const requestdata={fullName:fullName,email,password};
        axios.post(`${API_BASE_URL}/signup`,requestdata)
        .then((result)=>{
            if(result.status == 201){
                setLoading(false);
                Swal.fire({
                    icon:"success",
                    title:"User successfully registered"
                })
                setFullName('');
                setEmail('');
                setPassword('');
            }
        })
        .catch((error)=>{
            setLoading(false);
            Swal.fire({
                icon:"error",
                title:"Some Error occured"
            })
            console.log(error);
        })
    }
    return ( 
        <div className="container loginbody">
            <div className='row g-4'>
                <div className="col-md-7 shadow  d-flex justify-content-center">
                    <img className="login-img " src={logobigscreen}></img>
                    <img className="loginsmall-img" src={logosmallscreen}></img>
                </div>
                <div className="col-md-5 ">
                        <div className='card shadow text-center' >
                            {loading ? <div className='col-md-12  mt-3 text-center'>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
                            <div className='card-body p-4 '>
                                <h3 className='d-flex justify-content-center'><strong>Sign Up</strong></h3>
                                <form onSubmit={(e)=>signup(e)}>
                                    <input type='text' className='p-2 login-input form-control mt-2' placeholder='Phone'/>
                                    <input value={email} type='email' onChange={(ev)=>setEmail(ev.target.value)} className='p-2 login-input form-control mt-2' placeholder='Enter Email'/>
                                    <input value={fullName} type='text' onChange={(ev)=>setFullName(ev.target.value)} className='p-2 login-input form-control mt-2' placeholder='Enter Full Name'/>
                                    <input value={password} type='password' onChange={(ev)=>setPassword(ev.target.value)} className='p-2 login-input form-control mt-2' placeholder='Enter Password'/>
                                    <button type='submit' className="login-button border border-4 bg-info text-white form-control mt-2" >Sign Up</button>
                                </form>
                                <pre className='mt-3'>---------------Or--------------</pre>
                                <div className='mt-3 mb-3'>
                                    Already have account? <Link to='/login'>Log In</Link>
                                </div>
                            </div>
                        </div>
                </div>           
            </div>
        </div>
     );
}

export default Signup;