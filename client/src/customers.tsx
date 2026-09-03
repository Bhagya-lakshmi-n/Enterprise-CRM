import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
};

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const loadCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          status: "Active",
        }),
      });

      if (!response.ok) {
        alert("Failed to add customer");
        return;
      }

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setShowForm(false);

      loadCustomers();
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: "DELETE",
      });

      loadCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone} ${customer.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers and their information.</p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Customer
        </button>
      </div>

      {showForm && (
        <div className="panel form-panel">
          <h2>Add Customer</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <br />

          <button className="save-button" onClick={addCustomer}>
            Save Customer
          </button>
        </div>
      )}

      <div className="panel">
        <div className="search-box">
          🔍
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center" }}>
                    No customers found
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.company}</td>
                    <td>
                      <span className="status">{customer.status}</span>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => deleteCustomer(customer.id)}
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

export default Customers;