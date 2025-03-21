import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCategories } from "../../data/services/categoryService";
import men_bag from "../../assets/men bag.jpg";
import men_wallet from "../../assets/men wallet.jpg";
import men_belt from "../../assets/men belt.jpg";
import women_bag from "../../assets/women bag.jpg";
import women_accesorries from "../../assets/women accessories.jpg";
import wommen_wallet from "../../assets/women wallet.jpg";
import './EditForm.css'; 
import Navbar from "../../components/Navbar";

export default function EditForm() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [productId,setProductId]=useState(0);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                setError("Failed to load categories!");
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProductData = async () => {
            const token = localStorage.getItem("token");
            if (!token || typeof token !== "string") {
                console.error("Invalid or missing token");
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5161/api/Products/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                const productData = response.data;
                console.log("DATA:",productData);
                setProductName(productData.name);
                setDescription(productData.description);
                setPrice(productData.price);
                setSelectedCategory(productData.categoryId);
                setImage(productData.imageURL);
                setProductId(productData.id);
            } catch (error) {
                console.error("Error fetching product data", error);
                navigate("/admin-panel");
            }
        };

        fetchProductData();
    }, [id, navigate]);

    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        setSelectedCategory(categoryId);

        let img_url = "";
        switch (parseInt(categoryId)) {
            case 2:
                img_url = men_bag;
                break;
            case 3:
                img_url = men_belt;
                break;
            case 4:
                img_url = men_wallet;
                break;
            case 5:
                img_url = women_accesorries;
                break;
            case 6:
                img_url = women_bag;
                break;
            default:
                img_url = wommen_wallet;
                break;
        }
        setImage(img_url);
      
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token || typeof token !== "string") {
            console.error("Invalid or missing token");
            navigate("/login");
            return;
        }

        console.log({
            name: productName,
            description: description,
            price: parseFloat(price),
            categoryId: selectedCategory,
            imageUrl: image.toString(),
        });

        try {
            await axios.put(
                `http://localhost:5161/api/Products/${id}`,
                {
                    id:productId,
                    name: productName,
                    description: description,
                    price: parseFloat(price),
                    categoryId: selectedCategory,
                    imageURL: image.toString(),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Product updated successfully!");
            navigate("/admin-panel");
        } catch (error) {
            console.error("Error updating product", error);
            alert("Failed to update product");
        }
    };

    if (!categories.length) {
        return <div>Loading categories...</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="edit-form">
            <h1 className="form-title">Edit Product</h1>
            <form>
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Product Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Product Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Select Category</label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="form-control"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="form-control"
                    />
                </div>
                <Button onClick={handleSave} className="save-button">Save</Button>
            </form>
        </div>
        </>
    );
}
