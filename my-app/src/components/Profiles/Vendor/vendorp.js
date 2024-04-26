import React from 'react';
import VendorProducts from './vendor_products';
import VendorInfo from './VendorInfo';
const VendorProductsPage = () => {
    return (
        <main>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 vstack gap-4">
                        <VendorInfo />
                        <VendorProducts />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VendorProductsPage;