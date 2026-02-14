import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaUsers,
  FaClock,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaChartLine,
  FaTrophy,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import {
  AreaChart,
  Area,
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
import './AdminDashboard.css';

function AdminDashboard() {
  const { user } = useAuth();

  // Mock data
  const stats = [
    {
      icon: <FaUsers />,
      title: 'Total Employees',
      value: '156',
      change: '+12',
      trend: 'up',
      color: '#00D9FF'
    },
    {
      icon: <FaClock />,
      title: 'Present Today',
      value: '142',
      percentage: '91%',
      trend: 'up',
      color: '#4FFFB0'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Monthly Payroll',
      value: '₹1.2Cr',
      change: '+5.2%',
      trend: 'up',
      color: '#D4AF37'
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Pending Leaves',
      value: '8',
      change: '-3',
      trend: 'down',
      color: '#FF6B9D'
    }
  ];

  const attendanceData = [
    { month: 'Jan', present: 148, absent: 8 },
    { month: 'Feb', present: 142, absent: 14 },
    { month: 'Mar', present: 150, absent: 6 },
    { month: 'Apr', present: 145, absent: 11 },
    { month: 'May', present: 152, absent: 4 },
    { month: 'Jun', present: 142, absent: 14 }
  ];

  const departmentData = [
    { name: 'IT', employees: 45, color: '#00D9FF' },
    { name: 'HR', employees: 12, color: '#4FFFB0' },
    { name: 'Finance', employees: 18, color: '#D4AF37' },
    { name: 'Marketing', employees: 25, color: '#FF6B9D' },
    { name: 'Operations', employees: 32, color: '#7B68EE' },
    { name: 'Sales', employees: 24, color: '#FF8C42' }
  ];

  const payrollTrend = [
    { month: 'Jan', amount: 115 },
    { month: 'Feb', amount: 118 },
    { month: 'Mar', amount: 120 },
    { month: 'Apr', amount: 117 },
    { month: 'May', amount: 119 },
    { month: 'Jun', amount: 122 }
  ];

  const pendingActions = [
    {
      type: 'leave',
      employee: 'Rahul Sharma',
      action: 'Leave Request',
      details: 'Casual Leave - 3 days',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      type: 'attendance',
      employee: 'Priya Patel',
      action: 'Late Entry',
      details: 'Check-in at 10:30 AM',
      time: '3 hours ago',
      priority: 'medium'
    },
    {
      type: 'leave',
      employee: 'Amit Kumar',
      action: 'Leave Request',
      details: 'Sick Leave - 1 day',
      time: '5 hours ago',
      priority: 'high'
    },
    {
      type: 'document',
      employee: 'Sneha Gupta',
      action: 'Document Upload',
      details: 'Address proof submitted',
      time: '1 day ago',
      priority: 'low'
    }
  ];

  const topPerformers = [
    { name: 'Vikram Singh', department: 'IT', score: 98, avatar: null },
    { name: 'Anita Desai', department: 'Sales', score: 96, avatar: null },
    { name: 'Rajesh Verma', department: 'Finance', score: 95, avatar: null },
    { name: 'Meera Iyer', department: 'Marketing', score: 94, avatar: null },
    { name: 'Arjun Nair', department: 'Operations', score: 93, avatar: null }
  ];

  return (
    <Layout>
      <div className="admin-dashboard">
        {/* Welcome Section */}
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome back, <strong>{user?.name}</strong>! Here's your company overview</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <Card key={index} className="admin-stat-card" hoverable>
              <div className="stat-content">
                <div
                  className="stat-icon"
                  style={{ background: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <p className="stat-label">{stat.title}</p>
                  <h2 className="stat-value">{stat.value}</h2>
                  <div className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{stat.change || stat.percentage}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="admin-charts-row">
          {/* Attendance Overview */}
          <Card
            title="Attendance Overview"
            subtitle="Monthly attendance trend"
            icon={<FaChartLine />}
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4FFFB0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4FFFB0" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B9D" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF6B9D" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="present"
                  stroke="#4FFFB0"
                  fillOpacity={1}
                  fill="url(#colorPresent)"
                />
                <Area
                  type="monotone"
                  dataKey="absent"
                  stroke="#FF6B9D"
                  fillOpacity={1}
                  fill="url(#colorAbsent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Department Distribution */}
          <Card
            title="Department Distribution"
            subtitle="Employees by department"
            icon={<FaUsers />}
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="employees"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Payroll Trend */}
        <Card
          title="Payroll Trend"
          subtitle="Monthly payroll expenses (in Lakhs)"
          icon={<FaMoneyBillWave />}
          className="payroll-chart"
        >
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={payrollTrend}>
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
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bottom Row */}
        <div className="admin-bottom-row">
          {/* Pending Actions */}
          <Card
            title="Pending Actions"
            subtitle="Requires your attention"
            icon={<FaExclamationTriangle />}
            className="pending-actions-card"
          >
            <div className="pending-actions-list">
              {pendingActions.map((action, index) => (
                <div key={index} className={`pending-action-item ${action.priority}`}>
                  <div className="action-info">
                    <h4>{action.employee}</h4>
                    <p className="action-type">{action.action}</p>
                    <p className="action-details">{action.details}</p>
                    <span className="action-time">{action.time}</span>
                  </div>
                  <div className="action-buttons">
                    <button className="btn-approve">
                      <FaCheckCircle /> Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Performers */}
          <Card
            title="Top Performers"
            subtitle="This month's best employees"
            icon={<FaTrophy />}
            className="top-performers-card"
          >
            <div className="performers-list">
              {topPerformers.map((performer, index) => (
                <div key={index} className="performer-item">
                  <div className="performer-rank">#{index + 1}</div>
                  <div className="performer-info">
                    <h4>{performer.name}</h4>
                    <p>{performer.department}</p>
                  </div>
                  <div className="performer-score">
                    <span className="score">{performer.score}</span>
                    <span className="score-label">Score</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;