import React from 'react';

const VendorProducts = () => {
    return (
        <div className="card-body">
            <div className="col-lg-8">
                <div className="bg-mode p-4">
                    <h1 className="h4 mb-4">Inventory</h1>
                    {/* Blog item START */}
                    <div className="card bg-transparent border-0">
                        <div className="row g-3">
                            <div className="col-4">
                                {/* Blog image */}
                                <img className="rounded" src="assets/images/post/4by3/03.jpg" alt="" />
                            </div>
                            <div className="col-8">
                                {/* Blog caption */}
                                <h5>Shirt</h5>
                                <div className="d-none d-sm-inline-block">
                                    <p className="mb-2">available.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Blog item END */}

                </div>
            </div>
        </div>
    );
};

export default VendorProducts;