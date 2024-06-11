import logo from './logo.svg';
import './App.css';
import Login from './component/login';
import Signup from './component/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import Postoverview from './component/postoverview';
import Footer from './component/Footer';
import Profile from './component/Profile';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  function Dynamicroutic(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const user = useSelector(state => state.userReducer);
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        navigate("/posts");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
  
    }, [])
    return(
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/posts" element={<Postoverview />} />
          <Route exact path="/myprofile" element={<Profile />} />
      </Routes>
    )
  }


  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Dynamicroutic/>
      </BrowserRouter>
    </div>

  );
}

export default App;
