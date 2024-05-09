import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getDatabase, ref, update, onValue, off} from 'firebase/database';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const db = getDatabase();
    const [product, setproduct] = useState({
        title: '',
        location: '',
        date: '',
        image: '',
        creator: ''
    });

    useEffect(() => {
        const productRef = ref(db, `products/${productId}`);
        onValue(productRef, (snapshot) => {
            setproduct(snapshot.val());
        });

        return () => {
            return () => off(productRef);
        };
    }, [productId, db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setproduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(db, `products/${productId}`), product);
            alert('product updated successfully');
            navigate(`/profile/${product.creator}`);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Product Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Product Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProduct;