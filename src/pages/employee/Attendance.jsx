import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaClock,
  FaCalendarCheck,
  FaSignInAlt,
  FaSignOutAlt,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Attendance.css';

function Attendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString());
    setCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now.toLocaleTimeString());
    setCheckedIn(false);
  };

  // Mock data
  const monthlyData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 9 },
    { day: 'Wed', hours: 8.5 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 4 },
  ];

  const attendanceHistory = [
    { date: '2024-02-14', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9, status: 'present' },
    { date: '2024-02-13', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: 9, status: 'present' },
    { date: '2024-02-12', checkIn: '09:00 AM', checkOut: '05:30 PM', hours: 8.5, status: 'present' },
    { date: '2024-02-11', checkIn: '10:00 AM', checkOut: '06:00 PM', hours: 8, status: 'late' },
    { date: '2024-02-10', checkIn: '-', checkOut: '-', hours: 0, status: 'leave' },
    { date: '2024-02-09', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9, status: 'present' },
  ];

  const stats = {
    totalDays: 22,
    present: 20,
    absent: 1,
    late: 1,
    totalHours: 176,
    avgHours: 8.8
  };

  return (
    <Layout>
      <div className="attendance-page">
        <div className="page-header">
          <div>
            <h1>Attendance Tracking</h1>
            <p>Manage your check-ins and view attendance history</p>
          </div>
        </div>

        {/* Check In/Out Section */}
        <div className="checkin-section">
          <Card className="checkin-card" variant="gradient">
            <div className="checkin-content">
              <div className="checkin-info">
                <h2>Today's Attendance</h2>
                <p className="current-date">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="time-display-large">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </div>
              </div>

              <div className="checkin-actions">
                {!checkedIn ? (
                  <button className="btn-checkin" onClick={handleCheckIn}>
                    <FaSignInAlt />
                    <span>Check In</span>
                  </button>
                ) : (
                  <button className="btn-checkout" onClick={handleCheckOut}>
                    <FaSignOutAlt />
                    <span>Check Out</span>
                  </button>
                )}

                {checkInTime && (
                  <div className="time-info">
                    <div className="time-badge in">
                      <FaClock /> In: {checkInTime}
                    </div>
                    {checkOutTime && (
                      <div className="time-badge out">
                        <FaClock /> Out: {checkOutTime}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="attendance-stats">
          <div className="stat-box present">
            <FaCheckCircle className="stat-icon" />
            <h3>{stats.present}</h3>
            <p>Present Days</p>
          </div>
          <div className="stat-box absent">
            <FaTimesCircle className="stat-icon" />
            <h3>{stats.absent}</h3>
            <p>Absent Days</p>
          </div>
          <div className="stat-box late">
            <FaExclamationCircle className="stat-icon" />
            <h3>{stats.late}</h3>
            <p>Late Entries</p>
          </div>
          <div className="stat-box hours">
            <FaClock className="stat-icon" />
            <h3>{stats.totalHours}</h3>
            <p>Total Hours</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <Card title="This Week's Hours" subtitle="Daily working hours" icon={<FaChartBar />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="day" stroke="var(--text-tertiary)" />
              <YAxis stroke="var(--text-tertiary)" />
              <Tooltip 
                contentStyle={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)'
                }}
              />
              <Bar dataKey="hours" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Attendance History */}
        <Card title="Attendance History" subtitle="Recent records" icon={<FaCalendarCheck />}>
          <div className="attendance-table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record, index) => (
                  <tr key={index}>
                    <td>
                      <div className="date-cell">
                        {new Date(record.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td>{record.checkIn}</td>
                    <td>{record.checkOut}</td>
                    <td>
                      <strong>{record.hours}h</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${record.status}`}>
                        {record.status === 'present' && <FaCheckCircle />}
                        {record.status === 'absent' && <FaTimesCircle />}
                        {record.status === 'late' && <FaExclamationCircle />}
                        {record.status === 'leave' && <FaCalendarCheck />}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Attendance;