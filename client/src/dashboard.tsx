function Dashboard() {
  return (
    <div>
      <header>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening today.</p>
        </div>

        <div className="user">
          🔔 &nbsp; 👤 Admin User
        </div>
      </header>

      <div className="cards">

        <div className="card">
          <span>👥 Total Customers</span>
          <h2>1,248</h2>
          <small>+12.5% this month</small>
        </div>

        <div className="card">
          <span>🎯 Active Leads</span>
          <h2>326</h2>
          <small>+8.2% this month</small>
        </div>

        <div className="card">
          <span>💰 Total Revenue</span>
          <h2>₹8.42L</h2>
          <small>+15.8% this month</small>
        </div>

        <div className="card">
          <span>📋 Pending Tasks</span>
          <h2>48</h2>
          <small>5 due today</small>
        </div>

      </div>

      <div className="content">

        <div className="panel">
          <h2>Recent Customers</h2>

          <div className="customer">
            <b>Rahul Kumar</b>
            <span>rahul@example.com</span>
            <label>Active</label>
          </div>

          <div className="customer">
            <b>Priya Sharma</b>
            <span>priya@example.com</span>
            <label>Active</label>
          </div>

          <div className="customer">
            <b>Arun Mehta</b>
            <span>arun@example.com</span>
            <label className="pending">Pending</label>
          </div>

          <div className="customer">
            <b>Sneha Kapoor</b>
            <span>sneha@example.com</span>
            <label>Active</label>
          </div>
        </div>

        <div className="panel">
          <h2>Sales Overview</h2>
          <p>Monthly Revenue</p>

          <div className="chart">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>

          <h2>₹8,42,000</h2>
        </div>

      </div>

      <div className="panel pipeline">
        <h2>Lead Pipeline</h2>

        <div className="pipeline-items">

          <div>
            <b>86</b>
            <span>New Leads</span>
          </div>

          <div>
            <b>64</b>
            <span>Contacted</span>
          </div>

          <div>
            <b>42</b>
            <span>Qualified</span>
          </div>

          <div>
            <b>28</b>
            <span>Proposal</span>
          </div>

          <div>
            <b>18</b>
            <span>Won</span>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;