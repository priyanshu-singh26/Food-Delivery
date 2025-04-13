// import { food_list } from "../assets/assets";
import axios from 'axios'

import { createContext, useEffect, useState } from "react";  // Create context

export const StoreContext = createContext(null) // exitcutable

const StoreContextprovider = (props) => {       // Create Provider


    const fetchFoodList = async () => {
        const response = await axios.get("http://localhost:4000/api/food/list");
        setfood_list(response.data.data)
        // console.log(response);
    }    

    // fetchCartData
    const fetchCartData = async () => {
        try {
            let token = localStorage.getItem("token")
          const res = await axios.get(`${url}/api/cart/get`,{headers:{token}});
          const cart = res.data.cart;
          console.log(cart)
    
          const cartData = {};
          const foodData = {};
    
          cart.forEach(entry => {
            const quantity = entry.quantity || 1;
            entry.items.forEach(item => {
              cartData[item._id] = quantity;
              foodData[item._id] = item;
            });
          });
    
          setCartItems(cartData);
        //   setfood_list(Object.values(foodData));
        } 
        catch (err) {
          console.error("Fetch cart error:", err);
        }
    };
    

    useEffect(()=>{
        async function loadData () {  
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                // await fetchCartData(localStorage.getItem("token"))
                await fetchCartData();
            }
        }
        loadData();
    },[])

    const [cartItems,setCartItems] = useState({})
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [food_list,setfood_list] = useState([])
    
    // add to cart
    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        // let cartItems = [];
        // food_list.map((item)=>{
        //     if(cartItems[item._id]>0){
        //         let itemInfo = item;
        //        // console.log(itemInfo)
        //         itemInfo["quantity"] = cartItems[item._id]
        //         orderItems.push(itemInfo)
        //     }
        // })

        let cartData = {
            itemId:itemId,
            // items: cartItems,
            amount: getTotalAmount()+2
        }
        if(token){
            await axios.post(url+"/api/cart/add",cartData,{headers:{token}})
        }
    }

    // remove to cart
    const removeCartItems = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        
        try{
           
            if(token){

                await axios.delete(url+"/api/cart/remove",{id:itemId},{headers:{token}});
            
            }
        }
        catch(error){
            console.log("Error in delete",error.message);
        }    
    }

    // const removeCartItems = async (id) => {
    //     setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
    //     if(token){
    //         await axios.delete(url+"/api/cart/remove",{id},{headers:{token}})
    //         // await axios.delete(`http://localhost:4000/api/cart/remove/${itemId}`)
    //     }
    // }

    // useEffect(()=>{
    //       console.log(cartItems)
    // },[cartItems])

    const getTotalAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
           if(cartItems[item]>0){ 
            let itemInfo = food_list.find((product)=>product._id === item);
            totalAmount = totalAmount + itemInfo.price * cartItems[item];
           } 
        }
        return totalAmount;
    }


    useEffect(()=>{
        localStorage.getItem("")
        setToken(localStorage.getItem("token"))
    },[])



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItems,
        getTotalAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextprovider; //export provider

// export default 