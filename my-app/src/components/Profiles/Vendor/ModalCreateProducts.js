import React, {useState} from 'react';
import { getDatabase, set,ref, push} from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "firebase/storage";
import { getAuth } from 'firebase/auth';

function ModalCreateProducts() {
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const productsRef = ref(db, 'products');
    const newProductRef = push(productsRef);

    const [productData, setproductData] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setproductData(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.log("No file selected.");
            return;
        }
        const storage = getStorage();
        const storageReference = storageRef(storage, `products/${file.name}`);
        try {
            const snapshot = await uploadBytes(storageReference, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setproductData(prev => ({...prev, image: downloadURL}));
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productData.title || !productData.description || !productData.image) {
            alert("Please fill in all location fields.");
            return;
        }
        try {
            await set(newProductRef, {...productData, creator: user.uid });
            alert("Product successfully created!");
        } catch (error) {
            console.error("Failed to create new product: ", error);
        }
    };

    return (
        <div className="modal fade" id="modalCreateProducts" tabIndex="-1" aria-labelledby="modalLabelCreateProducts"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabelCreateProducts">Create Item</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="row g-4" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label className="form-label">Item Name</label>
                                <input type="text" className="form-control" placeholder="Product name here" name="title"
                                       value={productData.title} onChange={handleChange}/>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" rows="2" placeholder="Ex: this shirt a L."
                                          name="description" value={productData.description} onChange={handleChange}></textarea>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Price</label>
                                <textarea className="form-control" rows="2" placeholder="Ex: $10.00."
                                          name="price" value={productData.price} onChange={handleChange}></textarea>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Upload attachment</label>
                                <input onChange={handleImageChange} type="file" className="form-control" name="attachments"/>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal"> Cancel</button>
                                <button type="submit" className="btn btn-success-soft">Create now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalCreateProducts;