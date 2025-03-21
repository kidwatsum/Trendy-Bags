import { Button } from "@mui/material";
import "./ItemComp.css";
import { AddShoppingCartRounded } from "@mui/icons-material";
import axios from "axios";

export default function ItemComp({image,name,items_sold,price,item_id}){

    const handleAddToCart=async()=>{
        const token=localStorage.getItem("token");

        try{
            const response=await axios.post("http://localhost:5161/api/Carts",{
                productId:item_id,
                quantity:1
            },{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            });
            alert("Item added to cart!");
        }catch(error){
            console.error("Error adding item to cart",error);
            alert("Failed to add item to cart!")
        }
    };

    return(
        <>
            <form className="single-item">
                <div className="item_image">
                    <img src={image} alt="Bag image"/>
                </div>
                <div className="item_info">
                    <input type="hidden" value={item_id}/>
                    <h5 className="item_name">{name}</h5>
                    <h5 className="items_sold">{items_sold}</h5>
                    <h4 className="item_price">MKD {price}</h4>
                    <div className="add-cart-btn">
                        <Button className="add-to-cart-btn" onClick={handleAddToCart} ><AddShoppingCartRounded/></Button>
                    </div>
                </div>
            </form>
        </>
    )
}