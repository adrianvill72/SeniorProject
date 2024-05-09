import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDatabase, ref, update, onValue, off, remove } from 'firebase/database';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const db = getDatabase();
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        creator: ''
    });

    useEffect(() => {
        const productRef = ref(db, `products/${productId}`);
        onValue(productRef, (snapshot) => {
            setProduct(snapshot.val() || {});
        });

        return () => {
            off(productRef);
        };
    }, [productId, db]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await update(ref(db, `products/${productId}`), product);
            alert('Product updated successfully');
            navigate(`/profile/${product.creator}`);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await remove(ref(db, `products/${productId}`));
                alert('Product deleted successfully');
                navigate('/'); // Navigate back to a safe route
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product.');
            }
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
                    <label htmlFor="price">Product Price</label>
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
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
