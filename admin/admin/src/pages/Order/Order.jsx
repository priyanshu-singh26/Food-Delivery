import React, { useEffect, useState } from 'react'
import './Order.css'
import axios from 'axios'
import { toast } from 'react-toastify'

function Order() {

  const [orders,setOrders] = useState([])

  const fetchAllOrders = async () => {
    const response = await axios.get(`http://localhost:4000/api/listOrders`)
    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else{
      toast.error("Error")

    }
  }

  useEffect(()=>{
    fetchAllOrders
  },[])

  return (
    <div>Order</div>
  )
}

export default Order