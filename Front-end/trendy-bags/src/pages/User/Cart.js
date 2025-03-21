import { useEffect, useState } from "react"
import "../User/Cart.css"
import axios from "axios";
import CartItemComp from "../../components/CartItemComp";
import CartSummary from "../../components/CartSummary";
import Navbar from "../../components/Navbar";
import { jwtDecode } from "jwt-decode";


export default function Cart(){

    const [cartItems,setCartItems]=useState([]);
    const [error,setError]=useState(null);
    const [totalPrice,setTotalPrice]=useState(0);

    useEffect(()=>{
        const fetchCartItems=async()=>{
            const token=localStorage.getItem("token");

            try{
                const response=await axios.get("http://localhost:5161/api/Carts",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setCartItems(response.data);
            }catch(error){
                setError("Error fetching cart items!");
                console.error("Error fetching cart items: ",error);
            }
        };
        fetchCartItems();
    },[]);

    //Calculate the total price
    useEffect(()=>{
        const total=cartItems.reduce((sum,item)=>{
            return sum+parseInt(item.price)*parseInt(item.quantity);
        },0);
        setTotalPrice(total);
    },[cartItems])

    //Handles deleting cart item
    const handleDeleteItem=(itemId)=>{
        setCartItems(cartItems.filter(item=>item.id!==itemId));
    }

    //Handles checkout
    const handleCheckout=async()=>{
        if(cartItems.length===0){
            alert("Your cart is empty!");
            return;
        }

        const token=localStorage.getItem("token");
        const decoded=jwtDecode(token);

        console.log(decoded);
        const userId=parseInt(decoded.sub,10);

        const orderData={
            UserId: userId,
            TotalPrice:totalPrice,
            Status:"Pending",
            CreatedAt:new Date().toISOString(),
            Items:cartItems.map(item=>({
                ProductId:item.productId,
                Quantity:item.quantity,
                Priced:item.price*item.quantity,
            }))
        };
        console.log( JSON.stringify(orderData,null,2));
        try{
            const response=await axios.post("http://localhost:5161/api/Orders",orderData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
            });

            if(response.status===201){
                alert("Order placed successfully!");
                setCartItems([]);
            }
        }catch(error){
            console.error("Error placing order:",error);
            alert("Failed to place order!");
        }

    }

    console.log(cartItems);
    return(
        <>  
            <Navbar/>
            <div className="cart-main">
                <div className="cart-left-main">
                {cartItems.length>0 ?(
                        cartItems.map((item)=>(
                            <CartItemComp name={item.name} desc={item.description} quantity={item.quantity} item_id={item.id} img_src={item.imageURL} onDelete={handleDeleteItem} />
                        ))
                ):(
                    <h1>Your cart is empty!</h1>
                )}
                </div>
                <div className="cart-right-item">
                    <CartSummary number_items={cartItems.length} total_price={totalPrice} onCheckout={handleCheckout} />
                </div>
            </div>  
        </>
    )
}