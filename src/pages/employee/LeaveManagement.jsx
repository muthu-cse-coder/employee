import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarCheck
} from 'react-icons/fa';
import './LeaveManagement.css';

function LeaveManagement() {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'casual',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false
  });

  const leaveBalance = {
    casual: { total: 12, used: 3, remaining: 9 },
    sick: { total: 10, used: 2, remaining: 8 },
    earned: { total: 15, used: 0, remaining: 15 }
  };

  const leaveHistory = [
    {
      id: 1,
      type: 'Casual Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      days: 3,
      reason: 'Personal work',
      status: 'approved',
      appliedOn: '2024-02-15'
    },
    {
      id: 2,
      type: 'Sick Leave',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      days: 2,
      reason: 'Fever and cold',
      status: 'approved',
      appliedOn: '2024-01-14'
    },
    {
      id: 3,
      type: 'Casual Leave',
      startDate: '2024-03-10',
      endDate: '2024-03-10',
      days: 1,
      reason: 'Family function',
      status: 'pending',
      appliedOn: '2024-02-14'
    },
    {
      id: 4,
      type: 'Earned Leave',
      startDate: '2023-12-25',
      endDate: '2023-12-27',
      days: 3,
      reason: 'Holiday vacation',
      status: 'rejected',
      appliedOn: '2023-12-20',
      rejectionReason: 'Critical project deadline'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Leave application submitted:', formData);
    // Add API call here
    alert('Leave application submitted successfully!');
    setShowApplyForm(false);
    setFormData({
      leaveType: 'casual',
      startDate: '',
      endDate: '',
      reason: '',
      halfDay: false
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheckCircle />;
      case 'pending':
        return <FaClock />;
      case 'rejected':
        return <FaTimesCircle />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="leave-management-page">
        <div className="page-header">
          <div>
            <h1>Leave Management</h1>
            <p>Apply for leave and track your applications</p>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => setShowApplyForm(!showApplyForm)}
          >
            <FaPlus /> Apply Leave
          </button>
        </div>

        {/* Apply Leave Form */}
        {showApplyForm && (
          <Card title="Apply for Leave" className="apply-leave-card">
            <form onSubmit={handleSubmit} className="leave-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Leave Type</label>
                  <select 
                    name="leaveType" 
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                  >
                    <option value="casual">Casual Leave ({leaveBalance.casual.remaining} available)</option>
                    <option value="sick">Sick Leave ({leaveBalance.sick.remaining} available)</option>
                    <option value="earned">Earned Leave ({leaveBalance.earned.remaining} available)</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="halfDay"
                      checked={formData.halfDay}
                      onChange={handleChange}
                    />
                    <span>Half Day</span>
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    disabled={formData.halfDay}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowApplyForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Leave Balance */}
        <div className="leave-balance-grid">
          <Card className="balance-card casual">
            <div className="balance-header">
              <FaCalendarCheck className="balance-icon" />
              <h3>Casual Leave</h3>
            </div>
            <div className="balance-stats">
              <div className="balance-item">
                <span className="balance-label">Total</span>
                <span className="balance-value">{leaveBalance.casual.total}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Used</span>
                <span className="balance-value used">{leaveBalance.casual.used}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Remaining</span>
                <span className="balance-value remaining">{leaveBalance.casual.remaining}</span>
              </div>
            </div>
          </Card>

          <Card className="balance-card sick">
            <div className="balance-header">
              <FaCalendarCheck className="balance-icon" />
              <h3>Sick Leave</h3>
            </div>
            <div className="balance-stats">
              <div className="balance-item">
                <span className="balance-label">Total</span>
                <span className="balance-value">{leaveBalance.sick.total}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Used</span>
                <span className="balance-value used">{leaveBalance.sick.used}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Remaining</span>
                <span className="balance-value remaining">{leaveBalance.sick.remaining}</span>
              </div>
            </div>
          </Card>

          <Card className="balance-card earned">
            <div className="balance-header">
              <FaCalendarCheck className="balance-icon" />
              <h3>Earned Leave</h3>
            </div>
            <div className="balance-stats">
              <div className="balance-item">
                <span className="balance-label">Total</span>
                <span className="balance-value">{leaveBalance.earned.total}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Used</span>
                <span className="balance-value used">{leaveBalance.earned.used}</span>
              </div>
              <div className="balance-divider"></div>
              <div className="balance-item">
                <span className="balance-label">Remaining</span>
                <span className="balance-value remaining">{leaveBalance.earned.remaining}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Leave History */}
        <Card title="Leave History" subtitle="All your leave applications" icon={<FaCalendarAlt />}>
          <div className="leave-history-list">
            {leaveHistory.map((leave) => (
              <div key={leave.id} className={`leave-item ${leave.status}`}>
                <div className="leave-item-header">
                  <div className="leave-type-badge">{leave.type}</div>
                  <div className={`leave-status ${leave.status}`}>
                    {getStatusIcon(leave.status)}
                    <span>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
                  </div>
                </div>
                <div className="leave-item-content">
                  <div className="leave-dates">
                    <FaCalendarAlt />
                    <span>
                      {new Date(leave.startDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short' 
                      })} - {new Date(leave.endDate).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="leave-days">({leave.days} {leave.days > 1 ? 'days' : 'day'})</span>
                  </div>
                  <div className="leave-reason">
                    <strong>Reason:</strong> {leave.reason}
                  </div>
                  {leave.rejectionReason && (
                    <div className="rejection-reason">
                      <strong>Rejection Reason:</strong> {leave.rejectionReason}
                    </div>
                  )}
                  <div className="leave-applied">
                    Applied on {new Date(leave.appliedOn).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default LeaveManagement;