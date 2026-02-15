import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaMoneyBillWave,
  FaCalculator,
  FaDownload,
  FaFileInvoice,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaUser
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './PayrollManagement.css';

function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('2024-02');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock payroll data
  const payrollRecords = [
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'IT',
      basicSalary: 50000,
      hra: 15000,
      allowances: 5000,
      grossSalary: 70000,
      deductions: 8000,
      netSalary: 62000,
      status: 'processed'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'HR',
      basicSalary: 45000,
      hra: 13500,
      allowances: 4000,
      grossSalary: 62500,
      deductions: 7200,
      netSalary: 55300,
      status: 'processed'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Finance',
      basicSalary: 40000,
      hra: 12000,
      allowances: 3500,
      grossSalary: 55500,
      deductions: 6400,
      netSalary: 49100,
      status: 'processed'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Sneha Gupta',
      department: 'Marketing',
      basicSalary: 42000,
      hra: 12600,
      allowances: 3800,
      grossSalary: 58400,
      deductions: 6800,
      netSalary: 51600,
      status: 'pending'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      department: 'IT',
      basicSalary: 48000,
      hra: 14400,
      allowances: 4500,
      grossSalary: 66900,
      deductions: 7600,
      netSalary: 59300,
      status: 'pending'
    }
  ];

  const payrollTrend = [
    { month: 'Sep', amount: 4.2 },
    { month: 'Oct', amount: 4.5 },
    { month: 'Nov', amount: 4.3 },
    { month: 'Dec', amount: 4.8 },
    { month: 'Jan', amount: 4.6 },
    { month: 'Feb', amount: 4.7 }
  ];

  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const stats = {
    total: payrollRecords.length,
    processed: payrollRecords.filter(r => r.status === 'processed').length,
    pending: payrollRecords.filter(r => r.status === 'pending').length,
    totalGross: payrollRecords.reduce((sum, r) => sum + r.grossSalary, 0),
    totalNet: payrollRecords.reduce((sum, r) => sum + r.netSalary, 0),
    totalDeductions: payrollRecords.reduce((sum, r) => sum + r.deductions, 0)
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Layout>
      <div className="payroll-management-page">
        <div className="page-header">
          <div>
            <h1>Payroll Management</h1>
            <p>Process and manage employee salaries</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => alert('Export feature coming soon!')}>
              <FaDownload /> Export Report
            </button>
            <button className="btn btn-primary" onClick={() => alert('Process payroll feature coming soon!')}>
              <FaCalculator /> Process Payroll
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="payroll-stats-grid">
          <Card className="stat-card total-gross">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Gross Salary</p>
              <h3>{formatCurrency(stats.totalGross)}</h3>
              <span className="stat-detail">For {stats.total} employees</span>
            </div>
          </Card>

          <Card className="stat-card total-deductions">
            <div className="stat-icon">
              <FaFileInvoice />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Deductions</p>
              <h3>{formatCurrency(stats.totalDeductions)}</h3>
              <span className="stat-detail">Tax, PF, etc.</span>
            </div>
          </Card>

          <Card className="stat-card total-net" variant="gradient">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Net Payable</p>
              <h3>{formatCurrency(stats.totalNet)}</h3>
              <span className="stat-detail">Take home amount</span>
            </div>
          </Card>

          <Card className="stat-card processed">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <p className="stat-label">Processed</p>
              <h3>{stats.processed}/{stats.total}</h3>
              <span className="stat-detail">{stats.pending} pending</span>
            </div>
          </Card>
        </div>

        {/* Payroll Trend Chart */}
        <Card title="Payroll Trend" subtitle="Last 6 months (in Lakhs)" icon={<FaMoneyBillWave />}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={payrollTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" stroke="var(--text-tertiary)" />
              <YAxis stroke="var(--text-tertiary)" />
              <Tooltip
                contentStyle={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}
                formatter={(value) => `₹${value}L`}
              />
              <Bar dataKey="amount" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Filters */}
        <Card className="filters-card">
          <div className="filters-row">
            <div className="month-picker">
              <FaFilter />
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by name or ID..."
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
          </div>
        </Card>

        {/* Payroll Table */}
        <Card>
          <div className="table-header">
            <h3>Payroll Records ({filteredRecords.length})</h3>
            <span className="month-display">
              {new Date(selectedMonth + '-01').toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="table-wrapper">
            <table className="payroll-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Basic Salary</th>
                  <th>HRA</th>
                  <th>Allowances</th>
                  <th>Gross Salary</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          <FaUser />
                        </div>
                        <div>
                          <div className="employee-name">{record.employeeName}</div>
                          <div className="employee-details">
                            {record.employeeId} • {record.department}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{formatCurrency(record.basicSalary)}</td>
                    <td>{formatCurrency(record.hra)}</td>
                    <td>{formatCurrency(record.allowances)}</td>
                    <td><strong>{formatCurrency(record.grossSalary)}</strong></td>
                    <td className="deduction-cell">-{formatCurrency(record.deductions)}</td>
                    <td className="net-salary-cell">
                      <strong>{formatCurrency(record.netSalary)}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${record.status}`}>
                        {record.status === 'processed' ? <FaCheckCircle /> : <FaClock />}
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn generate"
                        onClick={() => alert('Generate slip feature coming soon!')}
                        title="Generate Slip"
                      >
                        <FaFileInvoice />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="total-row">
                  <td><strong>Total</strong></td>
                  <td><strong>{formatCurrency(filteredRecords.reduce((s, r) => s + r.basicSalary, 0))}</strong></td>
                  <td><strong>{formatCurrency(filteredRecords.reduce((s, r) => s + r.hra, 0))}</strong></td>
                  <td><strong>{formatCurrency(filteredRecords.reduce((s, r) => s + r.allowances, 0))}</strong></td>
                  <td><strong>{formatCurrency(filteredRecords.reduce((s, r) => s + r.grossSalary, 0))}</strong></td>
                  <td className="deduction-cell"><strong>-{formatCurrency(filteredRecords.reduce((s, r) => s + r.deductions, 0))}</strong></td>
                  <td className="net-salary-cell"><strong>{formatCurrency(filteredRecords.reduce((s, r) => s + r.netSalary, 0))}</strong></td>
                  <td colSpan="2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default PayrollManagement;