import FilterComp from "../../components/FilterComp";
import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import ItemComp from "../../components/ItemComp";
import "./MenBags.css"
import axios from "axios";
import { useEffect, useState } from "react";

export default function MenBags(){

    const [menBags,setMenBags]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchBags= async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                const filtered=response.data.filter(product=>product.categoryId===2);
                
                setMenBags(filtered);
            }catch(error){
                setError("Error fetching accessories");
                alert("Error fetching:",error);
            }
        };
        fetchBags();
    },[]);

    return(
        <>
            <Navbar/>
            <FilterComp/>
            <div className="men_bags-main">
                {menBags.map((product)=>(
                                                                    <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                                                                ))}
            </div>
        </>
    )
};