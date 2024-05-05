import React, { useState, useEffect } from 'react';
import ProductCard from './vendor_products';
import VendorInfo from './VendorInfo';
import {getDatabase, onValue, ref} from "firebase/database";

const VendorProductsPage = () => {
    const [products, setProducts] = useState([]);


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
                }));
                setProducts(loadedproducts);
            }
        }); 
    }, []); 
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <VendorInfo />
                        < ProductCard products={products} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VendorProductsPage;