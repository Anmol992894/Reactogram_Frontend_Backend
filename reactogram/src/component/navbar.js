import React from 'react'
import logo from '../images/logo.PNG'
import './styling.css'
import { NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

function Navbar() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user = useSelector(state => state.userReducer);

  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({type:"LOGIN_ERROR"});
    navigate("/login")
  }


  return (
    <div>
      <nav className='navbar bg-light shadow'>
        <div className='container-fluid'>
          <NavLink to="/">
          <img alt='logo' className='logo-nav' src={logo}/>
          </NavLink>
            <form className='d-flex form-nav me-md-5 me-sm-2 ' role='search'>
                <input className='searchbox form-control' type='search' placeholder='search'/>
                <NavLink className='nav-link px-md-3 pad-icon pt-3 text-dark fs-5' to={"/posts"}><i className="fa-solid fa-house"></i></NavLink>
                <NavLink className='nav-link search-icon pt-3 pad-icon px-md-3 px-sm-2 pt-2 text-dark fs-5' href='#'><i className="fa-solid fa-magnifying-glass"></i></NavLink>
                {localStorage.getItem("token") ? <NavLink className='nav-link px-md-3 pad-icon pt-3 text-dark fs-5' href='#'><i className="fa-regular fa-heart"></i></NavLink> :''}
                <div className="pt-2 dropdown float-end">
                      { localStorage.getItem("token") ? <><NavLink className="btn" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='me-4 profile-img'style={{width:'30px',height:'30px'}} alt='profile-image' src='https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink className='nav-link px-md-3 pad-icon pt-2 text-dark fs-5' to="/myprofile">My Profile</NavLink></li>
                        <li><a onClick={()=>logout()} className="dropdown-item" href="#">Logout</a></li>
                      </ul></> : ''}

                    </div>
            </form>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
