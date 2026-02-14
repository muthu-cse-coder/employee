// import { useAuth } from '../../context/AuthContext';

// function EmployeeDashboard() {
//   const { user } = useAuth();

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>Employee Dashboard</h1>
//       <p>Welcome, {user?.name}!</p>
//       <p>This is a placeholder for the employee dashboard. Full implementation coming in Phase 2.</p>
//     </div>
//   );
// }

// export default EmployeeDashboard;

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaClock,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaTrophy,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
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
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - Replace with actual API calls
  const stats = [
    {
      icon: <FaClock />,
      title: 'Working Hours',
      value: '176',
      unit: 'hrs',
      change: '+12%',
      isPositive: true,
      color: '#00D9FF'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Current Salary',
      value: '₹85,000',
      unit: '/month',
      change: '+5%',
      isPositive: true,
      color: '#D4AF37'
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Leave Balance',
      value: '12',
      unit: 'days',
      change: '-3 used',
      isPositive: false,
      color: '#4FFFB0'
    },
    {
      icon: <FaTrophy />,
      title: 'Performance',
      value: '94',
      unit: '%',
      change: '+8%',
      isPositive: true,
      color: '#FF8C42'
    }
  ];

  const attendanceData = [
    { month: 'Jan', hours: 168, target: 176 },
    { month: 'Feb', hours: 176, target: 176 },
    { month: 'Mar', hours: 172, target: 176 },
    { month: 'Apr', hours: 180, target: 176 },
    { month: 'May', hours: 176, target: 176 },
    { month: 'Jun', hours: 184, target: 176 }
  ];

  const performanceData = [
    { name: 'Quality', value: 95 },
    { name: 'Efficiency', value: 92 },
    { name: 'Teamwork', value: 88 },
    { name: 'Innovation', value: 90 }
  ];

  const leaveData = [
    { name: 'Used', value: 3, color: '#FF6B9D' },
    { name: 'Remaining', value: 12, color: '#4FFFB0' }
  ];

  const recentActivities = [
    { action: 'Checked in', time: '09:00 AM', date: 'Today', type: 'attendance' },
    { action: 'Leave approved', time: '02:30 PM', date: 'Yesterday', type: 'leave' },
    { action: 'Salary credited', time: '10:00 AM', date: '2 days ago', type: 'salary' },
    { action: 'Performance review', time: '03:15 PM', date: '3 days ago', type: 'review' }
  ];

  const upcomingEvents = [
    { title: 'Team Meeting', date: 'Tomorrow', time: '10:00 AM' },
    { title: 'Project Deadline', date: 'Feb 20', time: '05:00 PM' },
    { title: 'Training Session', date: 'Feb 25', time: '02:00 PM' }
  ];

  return (
    <Layout>
      <div className="employee-dashboard">
        {/* Welcome Section */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Welcome back, <span className="text-gold">{user?.name}</span>! 👋
            </h1>
            <p className="dashboard-subtitle">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="current-time">
            <div className="time-display">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <button className="btn btn-primary">
              <FaClock /> Check In
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="stat-card"
              hoverable
            >
              <div className="stat-content">
                <div 
                  className="stat-icon"
                  style={{ background: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-details">
                  <p className="stat-label">{stat.title}</p>
                  <h2 className="stat-value">
                    {stat.value}
                    <span className="stat-unit">{stat.unit}</span>
                  </h2>
                  <div className={`stat-change ${stat.isPositive ? 'positive' : 'negative'}`}>
                    {stat.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          {/* Attendance Chart */}
          <Card 
            title="Monthly Attendance" 
            subtitle="Working hours vs target"
            icon={<FaChartLine />}
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
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
                  dataKey="hours" 
                  stroke="#D4AF37" 
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Chart */}
          <Card 
            title="Performance Metrics" 
            subtitle="Current quarter"
            icon={<FaTrophy />}
            className="chart-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-tertiary)" />
                <YAxis stroke="var(--text-tertiary)" />
                <Tooltip 
                  contentStyle={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                <Bar dataKey="value" fill="#00D9FF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Activity & Events Row */}
        <div className="info-row">
          {/* Recent Activity */}
          <Card 
            title="Recent Activity" 
            subtitle="Your latest actions"
            className="activity-card"
          >
            <div className="activity-list">
              {recentActivities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-dot ${activity.type}`}></div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <span className="activity-time">
                      {activity.date} • {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card 
            title="Upcoming Events" 
            subtitle="What's next"
            className="events-card"
          >
            <div className="events-list">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="event-item">
                  <div className="event-date-badge">{event.date}</div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Leave Overview */}
          <Card 
            title="Leave Overview" 
            subtitle="Balance status"
            className="leave-card"
          >
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={leaveData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {leaveData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeDashboard;