import React, { useState, useEffect } from 'react';
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const ProductsList = ({products}) => {
    return (
        <div className="row g-4">
            {products.map((product) => (
                <ProductDetails key={product.id}  product={product}/>
            ))}
        </div>
    );
};

const ProductDetails = ({ product }) =>{
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const navigateToEditPage = (productId) => {
        navigate(`/products/edit/${productId}`);
    }

    return (
        <div className="col-sm-6 col-xl-4">
            <div className="card h-100">
                <div className="position-relative">
                    <img className="imgfluid rounded-top" src={product.image} alt="" />
                    {user && user.uid === product.creator && (
                        <div className="badge bg-danger text-white mt-2 me-2 position-absolute top-0 end-0">
                            <button onClick={() => navigateToEditPage(product.id)}>Edit</button>
                        </div>
                    )}
                </div>
                <div className="card-body position-relative pt-0">
                    <h6 className="mt-3">
                        {product.title}
                    </h6>
                    <p className="mb-0 small"><i className="bi bi-card-text pe-1"></i>description:  {product.description}</p>
                    <p className="small"><i className="bi bi-cash pe-1"></i>$ {product.price}</p>
                </div>
            </div>
        </div>
    );
}


export default ProductsList;