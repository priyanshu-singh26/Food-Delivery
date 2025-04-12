import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
 
  const url = "http://localhost:4000"
  const [list,setList] = useState([]);

  useEffect(() => {
    fecthList();
}, []);

  const fecthList = async () =>{
    try{
      const response = await axios.get(`http://localhost:4000/api/food/list`)
      console.log(response.data)
      // setList(response.data);
      if(response.data.success){
        setList(response.data.data)
      }
      else{
        toast.error("Error")
      }
    }
    catch(error){
      console.error("Error fetching list", error);
    }  
  }

  const removeFood = async(foodId) => {
      //  console.log(foodId)
      try{
        const response = await axios.delete(`${url}/api/food/remove`,{id:foodId})
        await fecthList();
        if(response.data.success){
          toast.success(response.data.message)
        }
      }
      catch(error){
        console.log("Error in delete")
        toast.error("Error")
      }  
  }
  
  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/` +item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List