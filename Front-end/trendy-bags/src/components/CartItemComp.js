import { Icon, IconButton } from "@mui/material"
import "../components/CartItemComp.css"
import { AddRounded, CheckCircleRounded, DeleteRounded, RemoveRounded } from "@mui/icons-material"
import axios from "axios";

export default function CartItemComp({name,desc,quantity,item_id,img_src,onDelete}){

    console.log({ name, desc, quantity, item_id, img_src });

    const handleDelete=async()=>{
        try{
            const token=localStorage.getItem("token");

            const response=await axios.delete(`http://localhost:5161/api/Carts/${item_id}`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.status===200){
                onDelete(item_id);
            }
        }catch(error){
            console.error("Error deleting cart item:",error);
            alert("Failed to delete cart item");
        }
    };

    return(
        <>
            <div className="cart-item-main">
                <CheckCircleRounded id="check-circle" />
                <img src={img_src} alt="product image"/>
                <div className="item-information">
                    <input type="hidden" value={item_id}/>
                    <h3>{name}</h3>
                    <h5>{desc}</h5>
                    <h5>Quantity:{quantity}</h5>
                </div>
                <div className="incrementer">
                    <IconButton id="minus-btn" ><RemoveRounded/></IconButton>
                    <div className="quantity-value">
                        {quantity}
                    </div>
                    <IconButton id="plus-btn"><AddRounded/></IconButton>
                </div>
                <div className="delete-div">
                    <Icon id="thrashcan-btn" onClick={handleDelete} ><DeleteRounded/></Icon>
                </div>
            </div>
        </>
    )
}