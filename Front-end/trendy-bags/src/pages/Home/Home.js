import ItemComp from "../../components/ItemComp";
import Navbar from "../../components/Navbar";
import bag_image from "../../assets/women bag.jpg"
import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home(){

    const [products,setProducts]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        const fetchProducts= async()=>{
            try{
                const response =await axios.get("http://localhost:5161/api/Products");
                
                setProducts(response.data);
            }catch(error){
                setError("Error fetching accessories");
                alert("Error fetching:",error);
            }
        };
        fetchProducts();
    },[]);

    return(
        <>
            <Navbar/>
            <div className="home-main">
                {products.map((product)=>(
                                                 <ItemComp image={product.imageURL} name={product.name} item_id={product.id} items_sold={product.description} price={product.price}/>
                                    ))}
            </div>
        </>
    )
}