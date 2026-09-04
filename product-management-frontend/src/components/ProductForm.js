import { useEffect, useState } from "react";
import api from "../services/Api";

export default function ProductForm({ onClose, fetchProducts, storedProduct }) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState("");

    const usrnme = localStorage.getItem("user");
    const pswrd = localStorage.getItem("password");

    const role = usrnme === "admin" ? true : false;

    useEffect(() => {

        if (storedProduct && Object.keys(storedProduct).length > 0 && Object.values(storedProduct).length > 0) {
            setName(storedProduct.name);
            setPrice(storedProduct.price);
            setQuantity(storedProduct.quantity);

        } else {
            setName("");
            setPrice("");
            setQuantity("");

        }

    }, [storedProduct]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || name.trim() === "") return setError("Product Name is required");
        if (!price) return setError("Product Price is required");
        if (price < 0) return setError("Product Price must be positive and greater than 0");
        if (!quantity) return setError("Product Quantity is required");
        if (quantity < 0) return setError("Product Quantity must be positive and greater than 0");

        try {

            if (role) {

                const productData = {
                    name: name,
                    price: Number(price),
                    quantity: Number(quantity)
                }

                const authdata = {
                    username: usrnme,
                    password: pswrd
                }

                if (storedProduct) {

                    await api.put(`/products/${storedProduct.id}`, productData, { auth: authdata });
                    alert("Product updated successfully");

                } else {

                    await api.post("/products", productData, { auth: authdata });
                    alert("Product added successfully");
                }

                setName("");
                setPrice("");
                setQuantity("");

                await fetchProducts();
                onClose();
            }

        } catch (err) {
            console.error(err);
            alert(storedProduct ? "Failed to update product" : "Failed to add product");
        }
    }

    const handleName = (event) => {
        const value = event.target.value;
        setName(value);

        if (!value.trim()) {
            setError("Product Name is required");
        } else {
            setError("");
        }
    }

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value);

        if (!value) {
            setError("Product Price is required");
        } else if (value < 0) {
            setError("Product Price must be positive and greater than 0");
        } else {
            setError("");
        }
    }

    const handleQuantity = (event) => {
        const value = event.target.value;
        setQuantity(value);

        if (!value) {
            setError("Product Quantity is required");
        } else if (value < 0) {
            setError("Product Quantity must be positive and greater than 0");
        } else {
            setError("");
        }
    }

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">

                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="mb-0"> {storedProduct ? "Edit Product" : "Add Product"}</h4>
                    <button type="button" className="btn btn-primary" onClick={onClose}></button>
                </div>

                <form onSubmit={handleSubmit} noValidate>

                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" placeholder="Enter Product Name" value={name} onChange={handleName} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" placeholder="Enter Product Price" value={price} onChange={handlePrice} />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" placeholder="Enter Product Quantity" value={quantity} onChange={handleQuantity} />
                    </div>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">  {storedProduct ? "Update Product" : "Save Product"}</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose} >Close</button>
                    </div>

                </form>
            </div>
        </div>
    )
}