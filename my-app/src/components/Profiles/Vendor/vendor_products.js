
import React, {useEffect, useState} from 'react';
import ProductList from './ProductDetails';
import ModalCreateProducts from './ModalCreateProducts';
import {useAuth}  from '../../../firebase';
import {getDatabase, onValue, ref} from "firebase/database";
import {useParams} from "react-router-dom";


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

function ProductCard({user}) {
    const [products, setProducts] = useState([]);
    const uid=useParams();
    const currentUID=uid["userId"]
    const currentUser=useAuth().user;
    let currentUserID=null;
    if(currentUser){
        currentUserID=currentUser.uid;
    }
    console.log("User:", user);
    console.log("Current User ID:", currentUserID);
    console.log("UID:", currentUID);
    useEffect(() => {
        const db = getDatabase();
        const productsRef = ref(db, 'products');

        // Fetch the data
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const loadedproducts = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).filter(product => product.creator === uid["userId"]);
                setProducts(loadedproducts);
            }
        });
    }, []);
    return (
        <div className="card">
            <div
                className="card-header d-sm-flex align-items-center text-center justify-content-sm-between border-0 pb-0">
                <h2 className="h4 card-title">Products</h2>
                {user && currentUserID === currentUID && (
                <ProductCreationButton />
                )}
                <ModalCreateProducts  />

            </div>
            <div className="card-body">
                <ProductList products={products} uid={currentUID} />
            </div>
        </div>
    );
}

export default ProductCard;