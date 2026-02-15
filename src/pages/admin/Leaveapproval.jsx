import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaFilter,
  FaSearch,
  FaUser,
  FaCalendarAlt,
  FaExclamationTriangle
} from 'react-icons/fa';
import './Leaveapproval.css';

function LeaveApproval() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'Rahul Sharma',
      department: 'IT',
      leaveType: 'Casual Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      days: 3,
      reason: 'Personal work - Family function in hometown',
      appliedOn: '2024-02-15',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: 2,
      employeeId: 'EMP003',
      employeeName: 'Amit Kumar',
      department: 'Finance',
      leaveType: 'Sick Leave',
      startDate: '2024-02-16',
      endDate: '2024-02-16',
      days: 1,
      reason: 'Severe fever and cold, doctor advised rest',
      appliedOn: '2024-02-15',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      employeeId: 'EMP005',
      employeeName: 'Vikram Singh',
      department: 'IT',
      leaveType: 'Casual Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      days: 3,
      reason: 'Planned vacation with family',
      appliedOn: '2024-02-14',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: 4,
      employeeId: 'EMP002',
      employeeName: 'Priya Patel',
      department: 'HR',
      leaveType: 'Earned Leave',
      startDate: '2024-02-18',
      endDate: '2024-02-19',
      days: 2,
      reason: 'Attending conference in Bangalore',
      appliedOn: '2024-02-10',
      status: 'approved',
      approvedBy: 'Admin',
      approvedOn: '2024-02-11',
      priority: 'normal'
    },
    {
      id: 5,
      employeeId: 'EMP004',
      employeeName: 'Sneha Gupta',
      department: 'Marketing',
      leaveType: 'Casual Leave',
      startDate: '2024-02-25',
      endDate: '2024-02-27',
      days: 3,
      reason: 'Wedding in family',
      appliedOn: '2024-02-08',
      status: 'rejected',
      rejectedBy: 'Admin',
      rejectedOn: '2024-02-09',
      rejectionReason: 'Critical campaign launch scheduled',
      priority: 'normal'
    }
  ]);

  const handleApprove = (id) => {
    if (window.confirm('Are you sure you want to approve this leave request?')) {
      setLeaveRequests(leaveRequests.map(req =>
        req.id === id
          ? {
              ...req,
              status: 'approved',
              approvedBy: 'Admin',
              approvedOn: new Date().toISOString().split('T')[0]
            }
          : req
      ));
      alert('Leave request approved successfully!');
    }
  };

  const handleReject = (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      setLeaveRequests(leaveRequests.map(req =>
        req.id === id
          ? {
              ...req,
              status: 'rejected',
              rejectedBy: 'Admin',
              rejectedOn: new Date().toISOString().split('T')[0],
              rejectionReason: reason
            }
          : req
      ));
      alert('Leave request rejected!');
    }
  };

  const filteredRequests = leaveRequests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesType = filterType === 'all' || req.leaveType === filterType;
    const matchesSearch =
      req.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const stats = {
    total: leaveRequests.length,
    pending: leaveRequests.filter(r => r.status === 'pending').length,
    approved: leaveRequests.filter(r => r.status === 'approved').length,
    rejected: leaveRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <Layout>
      <div className="leave-approval-page">
        <div className="page-header">
          <div>
            <h1>Leave Approval</h1>
            <p>Review and manage employee leave requests</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="leave-stats-grid">
          <Card className="stat-card total">
            <div className="stat-icon">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Requests</p>
            </div>
          </Card>

          <Card className="stat-card pending">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </Card>

          <Card className="stat-card approved">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.approved}</h3>
              <p>Approved</p>
            </div>
          </Card>

          <Card className="stat-card rejected">
            <div className="stat-icon">
              <FaTimesCircle />
            </div>
            <div className="stat-info">
              <h3>{stats.rejected}</h3>
              <p>Rejected</p>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="filters-card">
          <div className="filters-row">
            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by employee name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>
        </Card>

        {/* Leave Requests List */}
        <div className="leave-requests-list">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <Card key={request.id} className={`leave-request-card ${request.status}`}>
                <div className="request-header">
                  <div className="employee-info">
                    <div className="employee-avatar">
                      <FaUser />
                    </div>
                    <div>
                      <h3>{request.employeeName}</h3>
                      <p className="employee-details">
                        {request.employeeId} • {request.department}
                      </p>
                    </div>
                  </div>
                  <div className="request-badges">
                    {request.priority === 'high' && (
                      <span className="priority-badge high">
                        <FaExclamationTriangle /> High Priority
                      </span>
                    )}
                    <span className={`status-badge ${request.status}`}>
                      {request.status === 'pending' && <FaClock />}
                      {request.status === 'approved' && <FaCheckCircle />}
                      {request.status === 'rejected' && <FaTimesCircle />}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="request-body">
                  <div className="leave-details-grid">
                    <div className="detail-item">
                      <label>Leave Type</label>
                      <p className="leave-type">{request.leaveType}</p>
                    </div>
                    <div className="detail-item">
                      <label>Duration</label>
                      <p>
                        <FaCalendarAlt />
                        {new Date(request.startDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}{' '}
                        -{' '}
                        {new Date(request.endDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                        <span className="days-badge">({request.days} {request.days > 1 ? 'days' : 'day'})</span>
                      </p>
                    </div>
                    <div className="detail-item">
                      <label>Applied On</label>
                      <p>{new Date(request.appliedOn).toLocaleDateString('en-IN')}</p>
                    </div>
                  </div>

                  <div className="reason-section">
                    <label>Reason</label>
                    <p className="reason-text">{request.reason}</p>
                  </div>

                  {request.status === 'approved' && (
                    <div className="approval-info">
                      <FaCheckCircle />
                      Approved by {request.approvedBy} on{' '}
                      {new Date(request.approvedOn).toLocaleDateString('en-IN')}
                    </div>
                  )}

                  {request.status === 'rejected' && (
                    <div className="rejection-info">
                      <div className="rejection-header">
                        <FaTimesCircle />
                        Rejected by {request.rejectedBy} on{' '}
                        {new Date(request.rejectedOn).toLocaleDateString('en-IN')}
                      </div>
                      <div className="rejection-reason">
                        <strong>Reason:</strong> {request.rejectionReason}
                      </div>
                    </div>
                  )}
                </div>

                {request.status === 'pending' && (
                  <div className="request-actions">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(request.id)}
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(request.id)}
                    >
                      <FaTimesCircle /> Reject
                    </button>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="empty-state">
              <div className="empty-content">
                <FaCalendarCheck className="empty-icon" />
                <h3>No leave requests found</h3>
                <p>Try adjusting your filters</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default LeaveApproval;