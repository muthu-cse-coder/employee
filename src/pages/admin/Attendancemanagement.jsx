import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaClock,
  FaCalendar,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaUser
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Attendancemanagement.css';

function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock attendance data
  const [attendanceRecords] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'IT',
      date: '2024-02-15',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      hours: 9,
      status: 'present'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'HR',
      date: '2024-02-15',
      checkIn: '09:15 AM',
      checkOut: '06:15 PM',
      hours: 9,
      status: 'late'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Finance',
      date: '2024-02-15',
      checkIn: '-',
      checkOut: '-',
      hours: 0,
      status: 'absent'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Sneha Gupta',
      department: 'Marketing',
      date: '2024-02-15',
      checkIn: '09:00 AM',
      checkOut: '06:30 PM',
      hours: 9.5,
      status: 'present'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      department: 'IT',
      date: '2024-02-15',
      checkIn: '08:45 AM',
      checkOut: '06:00 PM',
      hours: 9.25,
      status: 'present'
    },
    {
      id: 6,
      employeeId: 'EMP006',
      employeeName: 'Anita Desai',
      department: 'Sales',
      date: '2024-02-15',
      checkIn: '-',
      checkOut: '-',
      hours: 0,
      status: 'leave'
    }
  ]);

  // Weekly attendance chart data
  const weeklyData = [
    { day: 'Mon', present: 142, absent: 8, late: 6 },
    { day: 'Tue', present: 145, absent: 7, late: 4 },
    { day: 'Wed', present: 148, absent: 5, late: 3 },
    { day: 'Thu', present: 140, absent: 10, late: 6 },
    { day: 'Fri', present: 142, absent: 8, late: 6 },
    { day: 'Sat', present: 138, absent: 12, late: 6 }
  ];

  const departments = ['All', 'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || record.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const stats = {
    total: attendanceRecords.length,
    present: attendanceRecords.filter(r => r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.status === 'late').length,
    leave: attendanceRecords.filter(r => r.status === 'leave').length
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <FaCheckCircle />;
      case 'absent':
        return <FaTimesCircle />;
      case 'late':
        return <FaExclamationCircle />;
      case 'leave':
        return <FaCalendar />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="attendance-management-page">
        <div className="page-header">
          <div>
            <h1>Attendance Management</h1>
            <p>Monitor and manage employee attendance records</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => alert('Export feature coming soon!')}>
              <FaDownload /> Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="attendance-stats-grid">
          <Card className="stat-card total">
            <div className="stat-icon">
              <FaUser />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Employees</p>
            </div>
          </Card>

          <Card className="stat-card present">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.present}</h3>
              <p>Present Today</p>
              <span className="percentage">{Math.round((stats.present / stats.total) * 100)}%</span>
            </div>
          </Card>

          <Card className="stat-card absent">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.absent}</h3>
              <p>Absent</p>
            </div>
          </Card>

          <Card className="stat-card late">
            <div className="stat-icon">
              <FaExclamationCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.late}</h3>
              <p>Late Entries</p>
            </div>
          </Card>

          <Card className="stat-card leave">
            <div className="stat-icon">
              <FaCalendar />
            </div>
            <div className="stat-info">
              <h3>{stats.leave}</h3>
              <p>On Leave</p>
            </div>
          </Card>
        </div>

        {/* Weekly Chart */}
        <Card title="Weekly Attendance Overview" subtitle="Last 6 days" icon={<FaClock />}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
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
              <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Filters */}
        <Card className="filters-card">
          <div className="filters-row">
            <div className="date-picker">
              <FaCalendar />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
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
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
              <option value="leave">On Leave</option>
            </select>
          </div>
        </Card>

        {/* Attendance Table */}
        <Card>
          <div className="table-header">
            <h3>Attendance Records ({filteredRecords.length})</h3>
            <span className="date-display">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="table-wrapper">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.employeeId}</strong>
                    </td>
                    <td>
                      <div className="employee-cell">
                        <div className="employee-avatar">
                          <FaUser />
                        </div>
                        <span>{record.employeeName}</span>
                      </div>
                    </td>
                    <td>
                      <span className="department-badge">{record.department}</span>
                    </td>
                    <td>{record.checkIn}</td>
                    <td>{record.checkOut}</td>
                    <td>
                      <strong>{record.hours > 0 ? `${record.hours}h` : '-'}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${record.status}`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="action-btn edit"
                        onClick={() => alert('Edit feature coming soon!')}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
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

export default AttendanceManagement;