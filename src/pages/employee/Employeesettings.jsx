import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaCog,
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
  FaShieldAlt,
  FaSave,
  FaKey,
  FaMobileAlt
} from 'react-icons/fa';
import './Employeesettings.css';

function EmployeeSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12'
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveUpdates: true,
    salaryAlerts: true,
    attendanceReminders: true,
    chatMessages: true,
    systemUpdates: false
  });

  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'dark',
    sidebarPosition: 'left',
    compactMode: false,
    animations: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'team',
    showEmail: true,
    showPhone: false,
    allowMessaging: true,
    activityStatus: true
  });

  // Password Change
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyToggle = (key) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveGeneral = () => {
    alert('General settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    alert('Notification preferences saved successfully!');
  };

  const handleSaveAppearance = () => {
    alert('Appearance settings saved successfully!');
  };

  const handleSavePrivacy = () => {
    alert('Privacy settings saved successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (passwords.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    alert('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <Layout>
      <div className="employee-settings-page">
        <div className="page-header">
          <div>
            <h1>Settings</h1>
            <p>Manage your account preferences and settings</p>
          </div>
        </div>

        {/* Settings Tabs */}
        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <FaCog /> General
          </button>
          <button
            className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </button>
          <button
            className={`tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <FaPalette /> Appearance
          </button>
          <button
            className={`tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <FaShieldAlt /> Privacy
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <FaLock /> Security
          </button>
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <Card title="General Settings" icon={<FaCog />}>
            <div className="settings-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Language</label>
                  <select
                    name="language"
                    value={generalSettings.language}
                    onChange={handleGeneralChange}
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timezone</label>
                  <select
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date Format</label>
                  <select
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralChange}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Time Format</label>
                  <select
                    name="timeFormat"
                    value={generalSettings.timeFormat}
                    onChange={handleGeneralChange}
                  >
                    <option value="12">12-hour (3:00 PM)</option>
                    <option value="24">24-hour (15:00)</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSaveGeneral}>
                  <FaSave /> Save Changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <Card title="Notification Preferences" icon={<FaBell />}>
            <div className="notifications-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <strong>Email Notifications</strong>
                  <p>Receive updates via email</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={() => handleNotificationToggle('emailNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Push Notifications</strong>
                  <p>Receive browser push notifications</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={() => handleNotificationToggle('pushNotifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Leave Updates</strong>
                  <p>Notifications about leave applications</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.leaveUpdates}
                    onChange={() => handleNotificationToggle('leaveUpdates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Salary Alerts</strong>
                  <p>Notifications when salary is credited</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.salaryAlerts}
                    onChange={() => handleNotificationToggle('salaryAlerts')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Attendance Reminders</strong>
                  <p>Daily check-in/check-out reminders</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.attendanceReminders}
                    onChange={() => handleNotificationToggle('attendanceReminders')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Chat Messages</strong>
                  <p>Notifications for new chat messages</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.chatMessages}
                    onChange={() => handleNotificationToggle('chatMessages')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>System Updates</strong>
                  <p>Announcements and system updates</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications.systemUpdates}
                    onChange={() => handleNotificationToggle('systemUpdates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSaveNotifications}>
                <FaSave /> Save Preferences
              </button>
            </div>
          </Card>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <Card title="Appearance Settings" icon={<FaPalette />}>
            <div className="appearance-settings">
              <div className="setting-section">
                <h4>Theme</h4>
                <div className="theme-options">
                  <button
                    className={`theme-btn ${appearance.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'light')}
                  >
                    <div className="theme-preview light"></div>
                    Light
                  </button>
                  <button
                    className={`theme-btn ${appearance.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'dark')}
                  >
                    <div className="theme-preview dark"></div>
                    Dark
                  </button>
                  <button
                    className={`theme-btn ${appearance.theme === 'auto' ? 'active' : ''}`}
                    onClick={() => handleAppearanceChange('theme', 'auto')}
                  >
                    <div className="theme-preview auto"></div>
                    Auto
                  </button>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Compact Mode</strong>
                  <p>Reduce spacing for more content</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={appearance.compactMode}
                    onChange={() => handleAppearanceChange('compactMode', !appearance.compactMode)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Animations</strong>
                  <p>Enable smooth transitions and animations</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={appearance.animations}
                    onChange={() => handleAppearanceChange('animations', !appearance.animations)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSaveAppearance}>
                <FaSave /> Save Appearance
              </button>
            </div>
          </Card>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <Card title="Privacy Settings" icon={<FaShieldAlt />}>
            <div className="privacy-settings">
              <div className="setting-section">
                <h4>Profile Visibility</h4>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="profileVisibility"
                      checked={privacy.profileVisibility === 'everyone'}
                      onChange={() => setPrivacy(prev => ({ ...prev, profileVisibility: 'everyone' }))}
                    />
                    <span>Everyone</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="profileVisibility"
                      checked={privacy.profileVisibility === 'team'}
                      onChange={() => setPrivacy(prev => ({ ...prev, profileVisibility: 'team' }))}
                    />
                    <span>Team Members Only</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="profileVisibility"
                      checked={privacy.profileVisibility === 'private'}
                      onChange={() => setPrivacy(prev => ({ ...prev, profileVisibility: 'private' }))}
                    />
                    <span>Private</span>
                  </label>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Show Email Address</strong>
                  <p>Display email on your profile</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacy.showEmail}
                    onChange={() => handlePrivacyToggle('showEmail')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Show Phone Number</strong>
                  <p>Display phone number on your profile</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacy.showPhone}
                    onChange={() => handlePrivacyToggle('showPhone')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Allow Messaging</strong>
                  <p>Let others send you direct messages</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacy.allowMessaging}
                    onChange={() => handlePrivacyToggle('allowMessaging')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <strong>Activity Status</strong>
                  <p>Show when you're online</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={privacy.activityStatus}
                    onChange={() => handlePrivacyToggle('activityStatus')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleSavePrivacy}>
                <FaSave /> Save Privacy Settings
              </button>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="security-section">
            <Card title="Change Password" icon={<FaKey />} className="password-card">
              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password (min 6 characters)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <FaKey /> Change Password
                  </button>
                </div>
              </form>
            </Card>

            <Card title="Security Options" icon={<FaLock />} className="security-options-card">
              <div className="security-settings">
                <div className="setting-item">
                  <div className="setting-info">
                    <strong>Two-Factor Authentication</strong>
                    <p>Add an extra layer of security</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">Enable 2FA</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <strong>Active Sessions</strong>
                    <p>Manage your logged-in devices</p>
                  </div>
                  <button className="btn btn-secondary btn-sm">View Sessions</button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <strong>Login Alerts</strong>
                    <p>Get notified of new login attempts</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default EmployeeSettings;