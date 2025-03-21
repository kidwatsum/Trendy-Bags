import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import ItemComp from "../../components/ItemComp";
import FilterComp from "../../components/FilterComp";
import "./WomenWallets.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function WomenWallets(){

    const [womenWallets,setWomenWallets]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchWallets= async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                const filtered=response.data.filter(product=>product.categoryId===7);
                
                setWomenWallets(filtered);
            }catch(error){
                setError("Error fetching accessories");
                alert("Error fetching:",error);
            }
        };
        fetchWallets();
    },[]);

    return(
        <>
            <Navbar/>
            <FilterComp/>
            <div className="women_wallets-main">
                {womenWallets.map((product)=>(
                                                    <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                                                ))}
            </div>
        </>
    )
};