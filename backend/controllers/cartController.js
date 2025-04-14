import { userModel } from "../models/userModel.js";
import { cartModel } from "../models/cartModel.js";


// add items to user cart
// export const addToCart = async (req, res) => {

//     const { userId, itemId, amount, quentity } = req.body

//     // try {
//     //     // Fetch the user data
//     //     let userData = await userModel.findById(req.body.userId);
//     //     console.log(userData)
//     //     if (!userData) {
//     //         return res.status(404).json({
//     //             status: false,
//     //             message: "User not found",
//     //         });
//     //     }

//     //     // Initialize cartData if it doesn't exist
//     //     let cartData = userData.cardData  ; 
//     //     console.log(cartData)

//     //     // Check if the item already exists in the cart
//     //     if (!cartData[req.body.itemId]) {
//     //         cartData[req.body.itemId] = 1;
//     //     } 
//     //     else {
//     //         // Otherwise, increase the quantity of the item in the cart
//     //         cartData[req.body.itemId] += 1;
//     //     }

//     //    // Update the user's cart in the database using findByIdAndUpdate
//     //    await userModel.findByIdAndUpdate(
//     //        req.body.userId,
//     //       { cardData: cartData }, // Update only the cart field
//     //     //   { new: true } 
//     //     );
//     //     console.log(cartData)

//     //     res.status(200).json({
//     //         status: true,
//     //         message: "Added to Cart",
//     //     });

//     // } 


//     // new cart..
//     try{
//         const newCart = new cartModel({
//             userId,
//             itemId,
//             amount,
//             quentity
//          });
    
//         const cartData = await newCart.save();
//         // push in user model.caeddata
//         userModel.cardData._id.push(cartData);

//     }



//     catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(400).json({
//             status: false,
//             message: "Error while adding item to cart",
//         });
//     }
// };


export const addToCart = async (req, res) => {
    const { userId, itemId, amount, quantity } = req.body;

    try {
        // Check if the item is already in the cart
        const existingCartItem = await cartModel.findOne({ userId, items: itemId });

        if (existingCartItem) {
            // Item already in cart, update quantity and amount
            existingCartItem.quantity += quantity;
            existingCartItem.amount += amount;

            const updatedCart = await existingCartItem.save();

            return res.status(200).json({
                status: true,
                message: "Item quantity updated in cart",
                cart: updatedCart
            });
        }

        // Item not in cart, create new cart entry
        const newCart = new cartModel({
            userId,
            items: [itemId],
            amount,
            quantity
        });

        const cartData = await newCart.save();

        // Add reference to user's cardData
        await userModel.findByIdAndUpdate(
            userId,
            { $push: { cardData: cartData._id } },
            { new: true }
        );

        res.status(201).json({
            status: true,
            message: "Item added to cart successfully",
            cart: cartData
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            status: false,
            message: "Error while adding item to cart",
        });
    }
};





// export const removeToCart = async (req,res) => {
//     try{
//         let userData = await userModel.findById(req.body.userId)
//         console.log(userData);
//         let cartData = await userData.cardData;
//         console.log(cartData);

//         if(cartData[req.params.itemId]>0){
//             cartData[req.params.itemId] -=1
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData})
//         res.status(200).json({
//             status: true,
//             message: "Remove From Cart",
//         })
//     }
//     catch(error){
//         res.status(400).json({
//             status: false,
//             message: "Error",
//         })

//     }

// }







// export const removeToCart = async (req, res) => {
//     try {
        
//         let userData = await userModel.findById(req.body.userId);

//         // Ensure cartData is available on the user data
//         // let cartData = userData.cartData;

        
//         if (cartData[req.body.itemId] > 0) {
//             cartData[req.body.itemId] -= 1; 
//         } 
//         else {
//             return res.status(400).json({
//                 status: false,
//                 message: "Item not in cart or quantity already 0",
//             });
//         }


//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });

//         res.status(200).json({
//             status: true,
//             message: "Removed from cart",
//         });
//     } 
//     catch (error) {
//         // Catch any errors and send an error response
//         res.status(400).json({
//             status: false,
//             message: "Error while removing item from cart",
//         });
//     }
// }



// export const getCart = async (req,res) => {
//     try{
//         let userData = await userModel.findById(req.body.userId)
//         let cartData = await userData.cartData;
//         console.log(cartData);

//         res.status(200).json({
//             status: true,
//             cartData
//             // message: "Added to Cart",
//         })
//     }
//     catch(error){
//         res.status(400).json({
//             status: false,
//             message: "Error",
//         })

//     }

// }



// export const getCart = async (req,res) => {
//     const carts = await ToDo.find()
//     res.send(carts);
// };



// export const removeToCart = async (req, res) => {
//     try {
//         // Fetch the user data by userId
//         let userData = await userModel.findById(req.body.userId);
//         if (!userData) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         // Fetch the cartData of the user
//         let cartData = userData.cardData;
//         console.log(cartData);
//         if (!cartData || !cartData[req.body.itemId]) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Item not found in cart or invalid itemId",
//             });  // user not define
//         }


//         // If the item exists and its count is greater than 0, decrement the count
//         if (cartData[req.body.itemId] >= 0) {
//             cartData[req.body.itemId] -= 1;

//             // If the item count is now 0, you can remove it from the cart (optional)
//             // if (cartData[req.body.itemId] === 0) {
//             //     cartData[req.body.itemId] -=1;
//             // }

//             // Update the cart in the database
//             await userModel.findByIdAndUpdate(req.body.userId, { cardData:cartData });

//             return res.status(200).json({
//                 status: true,
//                 message: "Item removed from cart",
//             });
//         } 
//         else {
//             return res.status(400).json({
//                 status: false,
//                 message: "Item quantity is already 0",
//             });
//         }
//     } 
//     catch (error) {
//         console.error(error); 
//         res.status(500).json({
//             status: false,
//             message: "Server Error: " + error.message,
//         });
//     }
// };



export const removeToCart = async (req, res) => {
    const { userId, cartId } = req.body;

    try {
        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found",
            });
        }

        // Check if the cartId exists in user's cartData
        if (!user.cardData.includes(cartId)) {
            return res.status(400).json({
                status: false,
                message: "Item not found in user's cart",
            });
        }

        // Fetch the cart document
        const cartItem = await cartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found",
            });
        }

        // Decrease quantity or remove completely
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
        } else {
            // Remove cart entry from DB
            await cartModel.findByIdAndDelete(cartId);

            // Remove reference from user's cartData
            user.cardData = user.cardData.filter(id => id.toString() !== cartId);
            await user.save();
        }

        res.status(200).json({
            status: true,
            message: "Item removed from cart",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Server Error: " + error.message,
        });
    }
};






// export const getCart = async (req, res) => {
//     try {
//         // Ensure that the userId exists in the request body
//         // if (!req.body.userId) {
//         //     return res.status(400).json({
//         //         status: false,
//         //         message: "User ID is required",
//         //     });
//         // }

//         // Find the user by userId
//         let userData = await userModel.findById(req.body.userId);
//         if (!userData) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         // Check if cartData exists
//         let cartData = await userData.cardData;
//         console.log(cartData)
//         if (!cartData || cartData.length === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "No items found in the cart",
//             });
//         }

//         console.log(cartData);

//         res.status(200).json({
//             status: true,
//             cartData, 
//         });
//     } 
//     catch (error) {
//         console.error(error); 
//         res.status(500).json({
//             status: false,
//             message: "An error occurred while fetching cart data.",
//         });
//     }
// };




export const getCart = async (req, res) => {
    // const { userId } = req.params;
    let userId = await userModel.findById(req.body.userId);
    console.log(userId);

    try {
        const cartItems = await cartModel.find({ userId })
        
            .populate('items') // get food item details
            .populate('userId', 'name email'); // optional: get user info

        res.status(200).json({
            status: true,
            cart: cartItems
        });
    } 
    catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({
            status: false,
            message: "Error fetching cart data"
        });
    }
};

