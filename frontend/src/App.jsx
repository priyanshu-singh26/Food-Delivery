import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
// import SignupPopup from './components/LoginPopup/Signup'   

function App() {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {/* {showLogin?<SignupPopup setShowLogin={setShowLogin}/>:<></>}    */}
    <div className='app'>
       <Navbar setShowLogin={setShowLogin}/>
       <Routes>
        
         <Route path='/' element={<Home />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/placeorder' element={<PlaceOrder />} />

         {/* <Route path='/login' element={<LoginPopup >/} /> */}

       </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App