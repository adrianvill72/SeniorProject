
import React from 'react';
import ProductList from './ProductDetails';
import ModalCreateProducts from './ModalCreateProducts';
import {useAuth}  from '../../../firebase';


const ProductCreationButton = () => {
    const {user} = useAuth();

    if (!user || !user.isVendor) { // change to is actual user id
        return null;  // Don't render anything if not authenticated or not a host
    }
    return (
        <button className="btn btn-primary-soft" data-bs-toggle="modal" data-bs-target="#modalCreateProducts">
            <i className="bi bi-plus"></i> Create Product
        </button>
    );
};

function ProductCard({products}) {
    return (
        <div className="card">
            <div
                className="card-header d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
                <h2 className="h4 card-title">Products</h2>
                <ProductCreationButton />
                <ModalCreateProducts  />
            </div>
            <div className="card-body">
                <ProductList products={products} />
            </div>
        </div>
    );
}

export default ProductCard;

