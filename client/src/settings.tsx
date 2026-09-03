import { useState } from "react";

function Settings() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@crm.com");
  const [company, setCompany] = useState("Enterprise CRM");
  const [notifications, setNotifications] = useState(true);

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your CRM settings and account.</p>
        </div>
      </div>

      <div className="settings-grid">

        <div className="panel">
          <h2>👤 Profile Settings</h2>

          <div className="settings-form">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>

        <div className="panel">
          <h2>🔔 Notifications</h2>

          <div className="setting-row">
            <div>
              <b>Email Notifications</b>
              <p>Receive CRM notifications by email.</p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </div>
        </div>

        <div className="panel">
          <h2>🔐 Security</h2>

          <div className="setting-row">
            <div>
              <b>Password</b>
              <p>Keep your account password secure.</p>
            </div>

            <button className="secondary-button">
              Change Password
            </button>
          </div>
        </div>

        <div className="panel">
          <h2>⚙️ System</h2>

          <div className="setting-row">
            <div>
              <b>Database</b>
              <p>MySQL database connection</p>
            </div>

            <span className="status">Connected</span>
          </div>
        </div>

      </div>

      <button className="save-button" onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}

export default Settings;