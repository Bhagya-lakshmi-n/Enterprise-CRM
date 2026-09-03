import "./App.css";
import { useState } from "react";
import Dashboard from "./dashboard";
import Customers from "./customers";
import Products from "./products";
import Orders from "./orders";
import Settings from "./settings";

function App() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>Enterprise CRM</h2>

        <button
          className={page === "Dashboard" ? "active" : ""}
          onClick={() => setPage("Dashboard")}
        >
          📊 Dashboard
        </button>

        <button
          className={page === "Customers" ? "active" : ""}
          onClick={() => setPage("Customers")}
        >
          👥 Customers
        </button>

        <button
          className={page === "Orders" ? "active" : ""}
          onClick={() => setPage("Orders")}
        >
          🛒 Orders
        </button>

        <button
          className={page === "Products" ? "active" : ""}
          onClick={() => setPage("Products")}
        >
          📦 Products
        </button>

        <button
          className={page === "Settings" ? "active" : ""}
          onClick={() => setPage("Settings")}
        >
          ⚙️ Settings
        </button>
      </aside>

      <main>

        {page === "Dashboard" && <Dashboard />}

        {page === "Customers" && <Customers />}

        {page === "Products" && <Products />}

        {page === "Orders" && <Orders />}

        {page === "Settings" && <Settings />}

      </main>
    </div>
  );
}

export default App;