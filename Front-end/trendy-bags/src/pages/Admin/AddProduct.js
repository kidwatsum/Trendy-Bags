import { Button } from "@mui/material";
import "./AddProduct.css";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "../../data/firebase";
import axios from "axios";
import { getCategories } from "../../data/services/categoryService";
import { addDoc, collection, getDoc } from "firebase/firestore";
import { BlobServiceClient } from "@azure/storage-blob";
import men_bag from "../../assets/men bag.jpg";
import men_wallet from "../../assets/men wallet.jpg";
import men_belt from "../../assets/men belt.jpg";
import women_bag from "../../assets/women bag.jpg";
import women_accesorries from "../../assets/women accessories.jpg";
import wommen_wallet from "../../assets/women wallet.jpg";
import Navbar from "../../components/Navbar";



export default function AddProduct(){

    const [productName,setProductName]=useState("");
    const [price,setPrice]=useState("");
    const [image,setImage]=useState(null);
    const [description,setDescription]=useState("");
    const [selectedCategory,setSelectedCategory]=useState(0);

    const[categories,setCategories]=useState([]);
    const[error,setError]=useState(null);

    //FOR GETTING ALL THE CATEGORIES
    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
                const data=await getCategories();
                setCategories(data);
            }catch(error){
                setError("Failed to load categories!")
            }
        };
        fetchCategories();
    },[])


    const handleAdd=async()=>{
        let img_url="";

        switch(parseInt(selectedCategory)){
            case 2:setImage(men_bag);break;
            case 3:setImage(men_belt);break;
            case 4:setImage(men_wallet);break;
            case 5:setImage(women_accesorries);break;
            case 6:setImage(women_bag);break;
            default:setImage(wommen_wallet);break;
        };

        
        try{

            

            await axios.post("http://localhost:5161/api/Products",{
                Name:productName,
                Description:description,
                Price:parseFloat(price),
                CategoryId:parseInt(selectedCategory),
                ImageUrl:image ? image.toString():"",
            });

            alert("Product added succesfully!")
        }catch(error){
            console.error("Error adding product",error);
            alert("Failed to add product");
        }

    };

    console.log(categories);
    
    return(
        <>
            <Navbar/>
            <form className="addproduct-main">
                <h1 id="add-product-title">Add Product</h1>
                <div className="product-input-element">
                    <label for="product-name">Product name:</label>
                    <input type="text" id="product-name" placeholder="Name" onChange={(e)=>setProductName(e.target.value)} />
                </div>
                <div className="product-input-element">
                    <label for="product-description">Product description:</label>
                    <input type="text" id="product-description" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div className="product-input-element">
                    <label for="product-price">Product price:</label>
                    <input type="number" id="product-price" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
                </div>
                {/* <div className="product-input-element">
                    <label for="product-image">Product image:</label>
                    <input type="file" id="product-image" placeholder="Drag product image here" onChange={(e)=>setImage(e.target.files[0])} />
                </div> */}
                <div className="product-input-element">
                    <label htmlFor="category-select">Select a category:</label>
                    <select id="category-select" onChange={(e)=>setSelectedCategory(e.target.value)}>
                        {categories.map((category)=>(
                                <option key={category.id} value={category.id}>{category.name}  </option>
                        ))}
                        
                    </select>
                </div>
                <Button id="add-product-btn" onClick={handleAdd} >Add Product</Button>
            </form>
        </>
    )
}