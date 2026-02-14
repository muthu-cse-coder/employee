import { useState } from 'react';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaTrash,
  FaCheckDouble,
  FaFilter
} from 'react-icons/fa';
import './Notifications.css';

function Notifications() {
  const [filter, setFilter] = useState('all'); // all, unread, read

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Leave Approved',
      message: 'Your leave application for Feb 20-22 has been approved by HR Manager.',
      time: '5 minutes ago',
      read: false,
      icon: <FaCheckCircle />
    },
    {
      id: 2,
      type: 'info',
      title: 'Salary Credited',
      message: 'Your salary for February 2024 (₹70,000) has been credited to your account.',
      time: '2 hours ago',
      read: false,
      icon: <FaMoneyBillWave />
    },
    {
      id: 3,
      type: 'warning',
      title: 'Pending Timesheet',
      message: 'Please submit your timesheet for last week before Friday.',
      time: '1 day ago',
      read: false,
      icon: <FaExclamationCircle />
    },
    {
      id: 4,
      type: 'info',
      title: 'Team Meeting',
      message: 'Reminder: Team standup meeting at 10:00 AM tomorrow.',
      time: '1 day ago',
      read: true,
      icon: <FaInfoCircle />
    },
    {
      id: 5,
      type: 'success',
      title: 'Performance Review',
      message: 'Your Q1 performance review is now available. Rating: Excellent (94%)',
      time: '2 days ago',
      read: true,
      icon: <FaCheckCircle />
    },
    {
      id: 6,
      type: 'info',
      title: 'Holiday Announcement',
      message: 'Office will be closed on March 25 for Holi festival.',
      time: '3 days ago',
      read: true,
      icon: <FaCalendarCheck />
    },
    {
      id: 7,
      type: 'warning',
      title: 'Document Upload',
      message: 'Please upload your updated address proof document.',
      time: '5 days ago',
      read: true,
      icon: <FaExclamationCircle />
    }
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Layout>
      <div className="notifications-page">
        <div className="page-header">
          <div>
            <h1>Notifications</h1>
            <p>
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'All caught up! No new notifications'}
            </p>
          </div>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button className="btn btn-secondary" onClick={handleMarkAllRead}>
                <FaCheckDouble /> Mark All Read
              </button>
            )}
            {notifications.length > 0 && (
              <button className="btn btn-outline" onClick={handleClearAll}>
                <FaTrash /> Clear All
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="notification-filters">
          <button
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="notifications-list">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              >
                <div className="notification-content">
                  <div className={`notification-icon ${notification.type}`}>
                    {notification.icon}
                  </div>
                  <div className="notification-body">
                    <div className="notification-header">
                      <h3>{notification.title}</h3>
                      {!notification.read && (
                        <span className="unread-indicator"></span>
                      )}
                    </div>
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button
                        className="action-btn"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <FaCheckCircle />
                      </button>
                    )}
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(notification.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="empty-state">
            <div className="empty-content">
              <FaBell className="empty-icon" />
              <h3>No notifications</h3>
              <p>
                {filter === 'unread' && 'You have no unread notifications'}
                {filter === 'read' && 'You have no read notifications'}
                {filter === 'all' && 'You don\'t have any notifications yet'}
              </p>
            </div>
          </Card>
        )}

        {/* Notification Settings */}
        <Card title="Notification Preferences" icon={<FaBell />} className="notification-settings">
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <strong>Email Notifications</strong>
                <p>Receive notifications via email</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <strong>Leave Updates</strong>
                <p>Get notified about leave application status</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <strong>Salary Alerts</strong>
                <p>Get notified when salary is credited</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <strong>Team Updates</strong>
                <p>Receive notifications about team activities</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Notifications;