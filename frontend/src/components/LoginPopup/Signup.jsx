import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { Link } from 'react-router-dom';


function SignupPopup({setShowLogin}) {


    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({...data,[name]:value}))
    }

    // useEffect(()=>{
    //    console.log(data)
    // },[data])


    const onLogin = async(event) => {
      // event.preventDefault();
      const formData = new FormData();
      formData.append("name",data.name)
      formData.append("email",data.email)
      formData.append("password",data.password)
      console.log(formData);

    try{
      if(currState==="Login"){
        // newUrl += "/api/user/auth/login"
        const response = await axios.post('http://localhost:4000/api/user/auth/login', formData)
        console.log(response)
      }
      else{
        // newUrl += "/api/user/auth/signup"
        const response = await axios.post('http://localhost:4000/api/user/auth/signup', formData)
        console.log(response)
      }
    }  


    catch(error){
      console.log("Error in login");
    } 

    }

  return (
    <div className='Login-Popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className="login-popup-title">
                
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-input">
                <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required />
            </div>

            <button type='submit'>Signup</button>

            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By Continuing, i agree to the terms of use & privacy policy.</p>
            </div>

            <p>Already have an account? <Link to="/login"><a href="#">Login here</a></Link></p>
            
            
        </form>
    </div>
  )
}

export default SignupPopup