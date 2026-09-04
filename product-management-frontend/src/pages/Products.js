import { useEffect, useState } from "react";
import api from "../services/Api";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showform, setShowForm] = useState(false);
    const [storedProduct, setStoredProduct] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // localStorage.setItem("user", "admin");
    // localStorage.setItem("password", "admin123");

    const usrnme = localStorage.getItem("user");
    const pswrd = localStorage.getItem("password");

    const role = usrnme === "admin" ? true : false;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");

            if (response.data) {
                setProducts(response.data);
            } else {
                setError("No data found");
            }
        } catch (error) {
            setError("Failed to fetch products");
        }
    };

    const handleShowform = () => {
        setShowForm(true);
    }

    const handleClose = () => {
        setShowForm(false);
        setStoredProduct(null);
    }

    const handleEdit = (product) => {
        if (product && Object.keys(product).length > 0 && Object.values(product).length > 0) {
            setStoredProduct(product);
            setShowForm(true);
        }
    }

    const handleDelete = async (id) => {
        try {

            const isConfirmed = window.confirm(
                "Are you sure you want to delete this product?"
            );

            if (!isConfirmed) return;

            if (id) {

                await api.delete(`/products/${id}`, {
                    auth: {
                        username: usrnme,
                        password: pswrd
                    }
                });

                alert("Product deleted successfully");

                await fetchProducts();
            } else {
                alert("Product id not found");
            }

        } catch (error) {
            alert("Failed to delete product");
        }
    }

    const handleLogout = () => {

        const isConfirmed = window.confirm(
            "Are you sure you want to logout ?"
        );

        if (!isConfirmed) return;

        localStorage.removeItem("user");
        localStorage.removeItem("password");

        navigate("/login");
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold mb-0">Product Management</h2>
                    <p className="text-muted mb-0">Manage your products</p>
                </div>

                <div>
                    {(role && !storedProduct) && (
                        <button className="btn btn-primary me-2" onClick={handleShowform} disabled={showform}> + Add Product</button>
                    )}
                    <button className="btn btn-success" onClick={handleLogout} >Logout</button>
                </div>



            </div>

            {(role && showform) && (
                <ProductForm onClose={handleClose} fetchProducts={fetchProducts} storedProduct={storedProduct} />
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    {role && (
                                        <th>Actions</th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray(products) && products.length > 0 ? (
                                    products.map((x) => (
                                        <tr key={x.id}>
                                            <td>{x.id}</td>
                                            <td>{x.name}</td>
                                            <td>₹ {x.price}</td>
                                            <td>{x.quantity}</td>
                                            {role && (
                                                <td>
                                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(x)}>Edit</button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(x.id)} >Delete</button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </div >
    );
}
