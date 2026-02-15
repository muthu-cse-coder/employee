import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaCog,
  FaBuilding,
  FaUsers,
  FaCalendar,
  FaShieldAlt,
  FaSave,
  FaPlus,
  FaTrash,
  FaEdit
} from 'react-icons/fa';
import './Settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  // Company Settings
  const [companyInfo, setCompanyInfo] = useState({
    name: 'RiserOne Technologies',
    email: 'info@riserone.com',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    website: 'https://riserone.com',
    taxId: 'GST123456789'
  });

  // Department Settings
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT', head: 'Rahul Sharma', employees: 45 },
    { id: 2, name: 'HR', head: 'Priya Patel', employees: 12 },
    { id: 3, name: 'Finance', head: 'Amit Kumar', employees: 18 },
    { id: 4, name: 'Marketing', head: 'Sneha Gupta', employees: 25 },
    { id: 5, name: 'Sales', head: 'Vikram Singh', employees: 32 },
    { id: 6, name: 'Operations', head: 'Anita Desai', employees: 24 }
  ]);

  // Leave Types
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, name: 'Casual Leave', days: 12, carryForward: true },
    { id: 2, name: 'Sick Leave', days: 10, carryForward: false },
    { id: 3, name: 'Earned Leave', days: 15, carryForward: true }
  ]);

  // Holidays
  const [holidays, setHolidays] = useState([
    { id: 1, name: 'Republic Day', date: '2024-01-26' },
    { id: 2, name: 'Holi', date: '2024-03-25' },
    { id: 3, name: 'Independence Day', date: '2024-08-15' },
    { id: 4, name: 'Diwali', date: '2024-11-01' },
    { id: 5, name: 'Christmas', date: '2024-12-25' }
  ]);

  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveCompanyInfo = () => {
    alert('Company information saved successfully!');
  };

  const handleAddDepartment = () => {
    const name = prompt('Enter department name:');
    if (name) {
      setDepartments([...departments, {
        id: departments.length + 1,
        name,
        head: 'Not Assigned',
        employees: 0
      }]);
    }
  };

  const handleDeleteDepartment = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const handleAddLeaveType = () => {
    const name = prompt('Enter leave type name:');
    if (name) {
      const days = parseInt(prompt('Enter number of days:'));
      if (days) {
        setLeaveTypes([...leaveTypes, {
          id: leaveTypes.length + 1,
          name,
          days,
          carryForward: false
        }]);
      }
    }
  };

  const handleAddHoliday = () => {
    const name = prompt('Enter holiday name:');
    if (name) {
      const date = prompt('Enter date (YYYY-MM-DD):');
      if (date) {
        setHolidays([...holidays, {
          id: holidays.length + 1,
          name,
          date
        }]);
      }
    }
  };

  return (
    <Layout>
      <div className="settings-page">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Configure system preferences and company settings</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === 'company' ? 'active' : ''}`}
            onClick={() => setActiveTab('company')}
          >
            <FaBuilding /> Company Info
          </button>
          <button
            className={`tab ${activeTab === 'departments' ? 'active' : ''}`}
            onClick={() => setActiveTab('departments')}
          >
            <FaUsers /> Departments
          </button>
          <button
            className={`tab ${activeTab === 'leave' ? 'active' : ''}`}
            onClick={() => setActiveTab('leave')}
          >
            <FaCalendar /> Leave Types
          </button>
          <button
            className={`tab ${activeTab === 'holidays' ? 'active' : ''}`}
            onClick={() => setActiveTab('holidays')}
          >
            <FaCalendar /> Holidays
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaShieldAlt /> Security
          </button>
        </div>

        {/* Company Info Tab */}
        {activeTab === 'company' && (
          <Card title="Company Information" icon={<FaBuilding />}>
            <div className="settings-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="name"
                    value={companyInfo.name}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea
                    name="address"
                    value={companyInfo.address}
                    onChange={handleCompanyInfoChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Tax ID (GST)</label>
                  <input
                    type="text"
                    name="taxId"
                    value={companyInfo.taxId}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSaveCompanyInfo}>
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <Card
            title="Department Management"
            icon={<FaUsers />}
            action={
              <button className="btn btn-primary btn-sm" onClick={handleAddDepartment}>
                <FaPlus /> Add Department
              </button>
            }
          >
            <div className="table-wrapper">
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Department Head</th>
                    <th>Employees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td><strong>{dept.name}</strong></td>
                      <td>{dept.head}</td>
                      <td>{dept.employees}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" title="Edit">
                            <FaEdit />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteDepartment(dept.id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Leave Types Tab */}
        {activeTab === 'leave' && (
          <Card
            title="Leave Type Configuration"
            icon={<FaCalendar />}
            action={
              <button className="btn btn-primary btn-sm" onClick={handleAddLeaveType}>
                <FaPlus /> Add Leave Type
              </button>
            }
          >
            <div className="table-wrapper">
              <table className="settings-table">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Allowed Days</th>
                    <th>Carry Forward</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveTypes.map(type => (
                    <tr key={type.id}>
                      <td><strong>{type.name}</strong></td>
                      <td>{type.days} days</td>
                      <td>
                        <span className={`badge ${type.carryForward ? 'success' : 'error'}`}>
                          {type.carryForward ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn edit" title="Edit">
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Holidays Tab */}
        {activeTab === 'holidays' && (
          <Card
            title="Holiday Calendar"
            icon={<FaCalendar />}
            action={
              <button className="btn btn-primary btn-sm" onClick={handleAddHoliday}>
                <FaPlus /> Add Holiday
              </button>
            }
          >
            <div className="holidays-grid">
              {holidays.map(holiday => (
                <div key={holiday.id} className="holiday-card">
                  <div className="holiday-date">
                    {new Date(holiday.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="holiday-info">
                    <h4>{holiday.name}</h4>
                    <p>{new Date(holiday.date).toLocaleDateString('en-US', { year: 'numeric' })}</p>
                  </div>
                  <button className="holiday-delete" title="Delete">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <Card title="Security Settings" icon={<FaShieldAlt />}>
            <div className="security-settings">
              <div className="security-item">
                <div className="security-info">
                  <strong>Two-Factor Authentication</strong>
                  <p>Add an extra layer of security to admin accounts</p>
                </div>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <strong>Session Timeout</strong>
                  <p>Automatically log out after 30 minutes of inactivity</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <strong>Password Expiry</strong>
                  <p>Require users to change passwords every 90 days</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="security-item">
                <div className="security-info">
                  <strong>Login Notifications</strong>
                  <p>Send email alerts for new login attempts</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default Settings;