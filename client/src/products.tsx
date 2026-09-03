import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const loadProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) {
      alert("Please enter product name and price");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          stock: Number(stock) || 0,
          status: Number(stock) > 0 ? "In Stock" : "Out of Stock",
        }),
      });

      if (!response.ok) {
        alert("Failed to add product");
        return;
      }

      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      setShowForm(false);

      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalProducts = products.length;
  const inStock = products.filter((p) => p.stock > 5).length;
  const lowStock = products.filter(
    (p) => p.stock > 0 && p.stock <= 5
  ).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Manage your products and inventory.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Product
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <span>📦 Total Products</span>
          <h2>{totalProducts}</h2>
          <small>All products</small>
        </div>

        <div className="card">
          <span>🟢 In Stock</span>
          <h2>{inStock}</h2>
          <small>Available products</small>
        </div>

        <div className="card">
          <span>⚠️ Low Stock</span>
          <h2>{lowStock}</h2>
          <small>Needs restocking</small>
        </div>

        <div className="card">
          <span>❌ Out of Stock</span>
          <h2>{outOfStock}</h2>
          <small>Currently unavailable</small>
        </div>
      </div>

      {showForm && (
        <div className="panel form-panel">
          <h2>Add Product</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <br />

          <button className="save-button" onClick={addProduct}>
            Save Product
          </button>
        </div>
      )}

      <div className="panel">
        <h2>Product List</h2>

        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>₹{Number(product.price).toLocaleString()}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className="status">{product.status}</span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;