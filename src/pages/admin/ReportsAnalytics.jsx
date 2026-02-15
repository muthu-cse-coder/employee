import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaChartBar,
  FaDownload,
  FaCalendar,
  FaFilter,
  FaFileExport,
  FaChartLine,
  FaUsers,
  FaClock,
  FaMoneyBillWave
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import './ReportsAnalytics.css';

function ReportsAnalytics() {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('month');
  const [department, setDepartment] = useState('all');

  // Mock data
  const attendanceData = [
    { month: 'Jan', present: 148, absent: 8 },
    { month: 'Feb', present: 142, absent: 14 },
    { month: 'Mar', present: 150, absent: 6 },
    { month: 'Apr', present: 145, absent: 11 },
    { month: 'May', present: 152, absent: 4 },
    { month: 'Jun', present: 142, absent: 14 }
  ];

  const performanceData = [
    { department: 'IT', score: 92 },
    { department: 'HR', score: 88 },
    { department: 'Finance', score: 90 },
    { department: 'Marketing', score: 85 },
    { department: 'Sales', score: 87 },
    { department: 'Operations', score: 89 }
  ];

  const salaryTrend = [
    { month: 'Jan', amount: 115 },
    { month: 'Feb', amount: 118 },
    { month: 'Mar', amount: 120 },
    { month: 'Apr', amount: 117 },
    { month: 'May', amount: 119 },
    { month: 'Jun', amount: 122 }
  ];

  const leaveDistribution = [
    { name: 'Approved', value: 45, color: '#10B981' },
    { name: 'Pending', value: 12, color: '#F59E0B' },
    { name: 'Rejected', value: 8, color: '#EF4444' }
  ];

  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  const handleExport = (format) => {
    alert(`Exporting ${reportType} report as ${format}. This will be implemented with backend API.`);
  };

  const stats = {
    totalEmployees: 156,
    avgAttendance: 91.5,
    totalLeaves: 65,
    avgPerformance: 88.5
  };

  return (
    <Layout>
      <div className="reports-analytics-page">
        <div className="page-header">
          <div>
            <h1>Reports & Analytics</h1>
            <p>Generate and view comprehensive reports</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => handleExport('PDF')}>
              <FaDownload /> Export PDF
            </button>
            <button className="btn btn-primary" onClick={() => handleExport('Excel')}>
              <FaFileExport /> Export Excel
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="report-stats-grid">
          <Card className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}>
              <FaUsers />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Employees</p>
              <h3>{stats.totalEmployees}</h3>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
              <FaClock />
            </div>
            <div className="stat-info">
              <p className="stat-label">Avg Attendance</p>
              <h3>{stats.avgAttendance}%</h3>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
              <FaCalendar />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Leaves</p>
              <h3>{stats.totalLeaves}</h3>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="stat-icon" style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#D4AF37' }}>
              <FaChartLine />
            </div>
            <div className="stat-info">
              <p className="stat-label">Avg Performance</p>
              <h3>{stats.avgPerformance}%</h3>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="filters-card">
          <div className="filters-row">
            <div className="filter-group">
              <label>Report Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                <option value="attendance">Attendance Report</option>
                <option value="performance">Performance Report</option>
                <option value="salary">Salary Report</option>
                <option value="leave">Leave Report</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Date Range</label>
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                {departments.map(dept => (
                  <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>&nbsp;</label>
              <button className="btn btn-primary" onClick={() => alert('Generating report...')}>
                <FaFilter /> Generate Report
              </button>
            </div>
          </div>
        </Card>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Attendance Trend */}
          <Card title="Attendance Trend" subtitle="Last 6 months" icon={<FaClock />} className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2} name="Present" />
                <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} name="Absent" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Performance */}
          <Card title="Department Performance" subtitle="Average scores" icon={<FaChartLine />} className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="department" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Bar dataKey="score" fill="#D4AF37" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Salary Trend */}
          <Card title="Salary Expenditure" subtitle="Monthly trend (in Lakhs)" icon={<FaMoneyBillWave />} className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={salaryTrend}>
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
                <Line type="monotone" dataKey="amount" stroke="#00D9FF" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Leave Distribution */}
          <Card title="Leave Distribution" subtitle="Current status" icon={<FaCalendar />} className="chart-card">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={leaveDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leaveDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Report Summary */}
        <Card title="Report Summary" icon={<FaChartBar />}>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-label">Report Type</div>
              <div className="summary-value">
                {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Date Range</div>
              <div className="summary-value">
                {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Department</div>
              <div className="summary-value">
                {department === 'all' ? 'All Departments' : department.charAt(0).toUpperCase() + department.slice(1)}
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-label">Generated On</div>
              <div className="summary-value">
                {new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          <div className="summary-actions">
            <button className="btn btn-secondary" onClick={() => handleExport('PDF')}>
              <FaDownload /> Download PDF
            </button>
            <button className="btn btn-secondary" onClick={() => handleExport('Excel')}>
              <FaFileExport /> Download Excel
            </button>
            <button className="btn btn-secondary" onClick={() => handleExport('CSV')}>
              <FaFileExport /> Download CSV
            </button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default ReportsAnalytics;