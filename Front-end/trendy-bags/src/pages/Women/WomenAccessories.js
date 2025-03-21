import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import ItemComp from "../../components/ItemComp";
import FilterComp from "../../components/FilterComp";
import "./WomenAccessories.css"
import { useEffect, useState } from "react";
import axios from "axios";

export default function WomenAccessories(){

    const [womenAccessories,setWomenAccessoires]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchAccessories= async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                const filtered=response.data.filter(product=>product.categoryId===5);
                
                setWomenAccessoires(filtered);
            }catch(error){
                setError("Error fetching accessories");
                alert("Error fetching:",error);
            }
        };
        fetchAccessories();
    },[]);

    return(
        <>
            <Navbar/>
            <FilterComp/>
            <div className="women_accessories-main">
                {womenAccessories.map((product)=>(
                                    <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                                ))}
            </div>
        </>
    )
};