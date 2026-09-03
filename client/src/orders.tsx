import { useEffect, useState } from "react";

type Order = {
  id: number;
  customer: string;
  product: string;
  quantity: number;
  total_amount: number;
  status: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");

  const loadOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const addOrder = async () => {
    if (!customer || !product || !quantity || !total) {
      alert("Please fill all order details");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          product,
          quantity: Number(quantity),
          total_amount: Number(total),
          status: "Pending",
        }),
      });

      if (!response.ok) {
        alert("Failed to add order");
        return;
      }

      setCustomer("");
      setProduct("");
      setQuantity("");
      setTotal("");
      setShowForm(false);

      loadOrders();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const deleteOrder = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "DELETE",
      });

      loadOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const filteredOrders = orders.filter((order) =>
    `${order.customer} ${order.product} ${order.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_amount),
    0
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Manage customer orders and sales.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Order
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <span>🛒 Total Orders</span>
          <h2>{orders.length}</h2>
          <small>All orders</small>
        </div>

        <div className="card">
          <span>⏳ Pending</span>
          <h2>{pendingOrders}</h2>
          <small>Pending orders</small>
        </div>

        <div className="card">
          <span>✅ Completed</span>
          <h2>{completedOrders}</h2>
          <small>Completed orders</small>
        </div>

        <div className="card">
          <span>💰 Revenue</span>
          <h2>₹{totalRevenue.toLocaleString()}</h2>
          <small>Total order value</small>
        </div>
      </div>

      {showForm && (
        <div className="panel form-panel">
          <h2>Add Order</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />

            <input
              type="text"
              placeholder="Product Name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <input
              type="number"
              placeholder="Total Amount"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>

          <br />

          <button className="save-button" onClick={addOrder}>
            Save Order
          </button>
        </div>
      )}

      <div className="panel">
        <h2>Order List</h2>

        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>₹{Number(order.total_amount).toLocaleString()}</td>
                    <td>
                      <span className="status">{order.status}</span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteOrder(order.id)}
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

export default Orders;