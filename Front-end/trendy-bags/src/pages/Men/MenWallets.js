import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import ItemComp from "../../components/ItemComp";
import FilterComp from "../../components/FilterComp";
import "./MenWallets.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function MenWallets(){

    const [menWallets,setMenWallets]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchWallets= async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                const filtered=response.data.filter(product=>product.categoryId===4);
                
                setMenWallets(filtered);
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
            <div className="men_wallets-main">
                {menWallets.map((product)=>(
                                 <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                    ))}
            </div>
        </>
    )
};