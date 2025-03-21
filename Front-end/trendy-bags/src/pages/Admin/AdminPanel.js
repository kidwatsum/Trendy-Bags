import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import './AdminPanel.css'; 
import Navbar from "../../components/Navbar";

export default function AdminPanel() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login'); 
            return; 
        }

        try {
            // Ensure token is a valid string before decoding
            if (typeof token !== 'string') {
                throw new Error('Invalid token');
            }

            const decoded = jwtDecode(token);

            // Check if the user is an admin
            if (decoded.role !== 'admin') {
                navigate('/'); 
            } else {
                //If user is admin fetch all products
                axios
                    .get('http://localhost:5161/api/Products', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then((response) => setProducts(response.data))
                    .catch((error) => console.error(error));
            }
        } catch (error) {
            console.error('Error decoding token', error);
            navigate('/login'); 
        }
    }, [navigate]);

    const deleteProduct = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        axios
            .delete(`http://localhost:5161/api/Products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setProducts(products.filter((product) => product.id !== productId));
            })
            .catch((error) => console.error('Error deleting product:', error));
    };

    return (
        <>
        <Navbar/>
        <div className="admin-panel">
            <h2 className="admin-panel-title">Admin Panel</h2>
            <button onClick={() => navigate('/add-product')} className="btn btn-primary">
                Add Product
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        {/* <th>Category</th> */}
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            {/* <td>{product.category.name}</td> */}
                            <td>{product.price}</td>
                            <td>
                                <button
                                    onClick={() => navigate(`/edit-product/${product.id}`)}
                                    className="btn btn-warning"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
