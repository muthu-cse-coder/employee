import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaTimes,
  FaSave,
  FaUserCircle
} from 'react-icons/fa';
import './Employeemanagement.css';

function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'IT',
    position: '',
    joinDate: '',
    salary: '',
    status: 'active'
  });

  // Mock employees data
  const [employees, setEmployees] = useState([
    {
      id: 'EMP001',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@riserone.com',
      phone: '+91 98765 43210',
      department: 'IT',
      position: 'Senior Developer',
      joinDate: '2022-01-15',
      salary: 85000,
      status: 'active',
      avatar: null
    },
    {
      id: 'EMP002',
      name: 'Priya Patel',
      email: 'priya.patel@riserone.com',
      phone: '+91 98765 43211',
      department: 'HR',
      position: 'HR Manager',
      joinDate: '2021-03-20',
      salary: 75000,
      status: 'active',
      avatar: null
    },
    {
      id: 'EMP003',
      name: 'Amit Kumar',
      email: 'amit.kumar@riserone.com',
      phone: '+91 98765 43212',
      department: 'Finance',
      position: 'Finance Executive',
      joinDate: '2022-06-10',
      salary: 65000,
      status: 'active',
      avatar: null
    },
    {
      id: 'EMP004',
      name: 'Sneha Gupta',
      email: 'sneha.gupta@riserone.com',
      phone: '+91 98765 43213',
      department: 'Marketing',
      position: 'Marketing Lead',
      joinDate: '2021-11-05',
      salary: 70000,
      status: 'active',
      avatar: null
    },
    {
      id: 'EMP005',
      name: 'Vikram Singh',
      email: 'vikram.singh@riserone.com',
      phone: '+91 98765 43214',
      department: 'IT',
      position: 'DevOps Engineer',
      joinDate: '2023-01-15',
      salary: 80000,
      status: 'active',
      avatar: null
    },
    {
      id: 'EMP006',
      name: 'Anita Desai',
      email: 'anita.desai@riserone.com',
      phone: '+91 98765 43215',
      department: 'Sales',
      position: 'Sales Manager',
      joinDate: '2020-08-20',
      salary: 90000,
      status: 'restricted',
      avatar: null
    }
  ]);

  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      ...formData,
      salary: parseFloat(formData.salary),
      avatar: null
    };
    setEmployees([...employees, newEmployee]);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'IT',
      position: '',
      joinDate: '',
      salary: '',
      status: 'active'
    });
    alert('Employee added successfully!');
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    setEmployees(employees.map(emp =>
      emp.id === selectedEmployee.id ? { ...emp, ...formData, salary: parseFloat(formData.salary) } : emp
    ));
    setShowEditModal(false);
    alert('Employee updated successfully!');
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
      alert('Employee deleted successfully!');
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      joinDate: employee.joinDate,
      salary: employee.salary.toString(),
      status: employee.status
    });
    setShowEditModal(true);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || emp.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="employee-management-page">
        <div className="page-header">
          <div>
            <h1>Employee Management</h1>
            <p>Manage all employees and their information</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => alert('Export feature coming soon!')}>
              <FaDownload /> Export
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <FaPlus /> Add Employee
            </button>
          </div>
        </div>

        {/* Filters */}
        <Card className="filters-card">
          <div className="filters-row">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Departments</option>
              {departments.slice(1).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>
        </Card>

        {/* Employees Table */}
        <Card>
          <div className="table-header">
            <h3>Employees ({filteredEmployees.length})</h3>
          </div>
          <div className="table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Join Date</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <strong>{employee.id}</strong>
                    </td>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          <FaUserCircle />
                        </div>
                        <div>
                          <div className="employee-name">{employee.name}</div>
                          <div className="employee-email">{employee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="department-badge">{employee.department}</span>
                    </td>
                    <td>{employee.position}</td>
                    <td>{new Date(employee.joinDate).toLocaleDateString('en-IN')}</td>
                    <td>
                      <strong>₹{employee.salary.toLocaleString('en-IN')}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${employee.status}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewEmployee(employee)}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => openEditModal(employee)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteEmployee(employee.id)}
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

        {/* Add Employee Modal */}
        <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Employee">
          <form onSubmit={handleAddEmployee} className="employee-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select name="department" value={formData.department} onChange={handleChange} required>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Join Date *</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Salary (₹) *</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="active">Active</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaSave /> Add Employee
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* Edit Employee Modal */}
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Employee">
          <form onSubmit={handleEditEmployee} className="employee-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select name="department" value={formData.department} onChange={handleChange} required>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Join Date *</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Salary (₹) *</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="active">Active</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <FaSave /> Save Changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        {/* View Employee Modal */}
        <Modal show={showViewModal} onClose={() => setShowViewModal(false)} title="Employee Details">
          {selectedEmployee && (
            <div className="employee-details">
              <div className="details-header">
                <div className="details-avatar">
                  <FaUserCircle />
                </div>
                <div>
                  <h3>{selectedEmployee.name}</h3>
                  <p>{selectedEmployee.position}</p>
                  <span className={`status-badge ${selectedEmployee.status}`}>
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <label>Employee ID</label>
                  <p>{selectedEmployee.id}</p>
                </div>
                <div className="detail-item">
                  <label>Email</label>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div className="detail-item">
                  <label>Phone</label>
                  <p>{selectedEmployee.phone}</p>
                </div>
                <div className="detail-item">
                  <label>Department</label>
                  <p>{selectedEmployee.department}</p>
                </div>
                <div className="detail-item">
                  <label>Join Date</label>
                  <p>{new Date(selectedEmployee.joinDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div className="detail-item">
                  <label>Salary</label>
                  <p><strong>₹{selectedEmployee.salary.toLocaleString('en-IN')}</strong></p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default EmployeeManagement;