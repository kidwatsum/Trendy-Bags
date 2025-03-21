import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import ItemComp from "../../components/ItemComp";
import FilterComp from "../../components/FilterComp";
import "./WomenBags.css"
import { useEffect, useState } from "react";
import axios from "axios";


export default function WomenBags(){

    const [womenBags,setWomenBags]=useState([]);
    const[error,setError]=useState("");

    useEffect(()=>{
        const fetchBags=async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                const filtered=response.data.filter(product=>product.categoryId===6);
                
                setWomenBags(filtered);
                
            }catch(error){
                setError("Failed to load prooducts");
                console.log("Error while fetching bags:",error);
            }
        };
        fetchBags();
    },[])

    console.log(womenBags);

    return(
        <>
            <Navbar/>
            <FilterComp/>
            <div className="women_bags-main">
                {/* <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" />
                <ItemComp image={bag_image} name="Handbag" item_id="id" items_sold="36 Sold" price="600" /> */}
                {womenBags.map((product)=>(
                    <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                ))}
            </div>
        </>
    )
};