import React, { useEffect, useState } from "react";

const Products = () => {
  // State hooks for managing product data and UI state
  const [products, setProducts] = useState([]); // Stores the list of products
  const [error, setError] = useState(""); // Stores error messages
  const [editProductId, setEditProductId] = useState(null); // Tracks the product being edited
  const [editedProduct, setEditedProduct] = useState({}); // Holds the edited product data
  const [newProduct, setNewProduct] = useState({ // Holds new product data for input fields
    name: "",
    description: "",
    unitPrice: "",
    minimumOrderQuantity: "",
    weightGram: "",
  });

  // Fetch products from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  // Handle editing a product
  const handleEditClick = (product) => {
    setEditProductId(product.productId);
    setEditedProduct({ ...product });
  };

  // Handle input change during editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Save the edited product details
  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/admin/${editProductId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update the product.");
      }

      // Update product list with edited product
      setProducts((prev) =>
        prev.map((product) =>
          product.productId === editProductId ? { ...product, ...editedProduct } : product
        )
      );

      // Reset editing state
      setEditProductId(null);
      setEditedProduct({});
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle deleting a product
  const handleDeleteClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/admin/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }

      // Remove deleted product from state
      setProducts((prev) => prev.filter((product) => product.productId !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle adding a new product
  const handleAddClick = async () => {
    try {
      const newId = Date.now().toString();
      const response = await fetch("http://localhost:3000/api/products/admin/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newProduct, productId: newId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the product.");
      }

      // Append new product to product list
      setProducts((prev) => [...prev, { ...newProduct, productId: newId }]);
      // Reset input fields
      setNewProduct({ name: "", description: "", unitPrice: "", minimumOrderQuantity: "", weightGram: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      {error && <p className="text-danger">{error}</p>}

      {/* Form to add new product */}
      <div className="mb-4">
        <h2>Add New Product</h2>
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="unitPrice"
              placeholder="Price"
              className="form-control"
              value={newProduct.unitPrice}
              onChange={(e) => setNewProduct({ ...newProduct, unitPrice: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100" onClick={handleAddClick}>Add</button>
          </div>
        </div>
      </div>

      {/* Table displaying products */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{editProductId === product.productId ? <input type="text" name="name" className="form-control" value={editedProduct.name} onChange={handleChange} /> : product.name}</td>
              <td>{editProductId === product.productId ? <input type="text" name="description" className="form-control" value={editedProduct.description} onChange={handleChange} /> : product.description}</td>
              <td>{editProductId === product.productId ? <input type="number" name="unitPrice" className="form-control" value={editedProduct.unitPrice} onChange={handleChange} /> : product.unitPrice}</td>
              <td>
                {editProductId === product.productId ? (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>Save</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditProductId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(product)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(product.productId)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
