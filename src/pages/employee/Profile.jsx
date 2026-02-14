import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendar,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaShieldAlt,
  FaGlobe
} from 'react-icons/fa';
import './Profile.css';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    address: 'Mumbai, Maharashtra, India',
    department: user?.department || '',
    position: user?.position || '',
    joinDate: 'January 15, 2022',
    employeeId: user?.id || '',
    bio: 'Passionate software developer with expertise in modern web technologies.',
    skills: ['React', 'Node.js', 'Python', 'MongoDB'],
    languages: ['English', 'Hindi'],
    website: 'https://johndoe.dev'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile({ name: formData.name, email: formData.email });
    setIsEditing(false);
    // Show success toast here
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      ...formData
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="profile-page">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>My Profile</h1>
            <p>Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                <FaSave /> Save Changes
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-grid">
          {/* Profile Card */}
          <Card className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-wrapper">
                <div className="profile-avatar-large">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <FaUser />
                  )}
                </div>
                {isEditing && (
                  <button className="avatar-upload-btn">
                    <FaCamera />
                  </button>
                )}
              </div>
              <div className="profile-identity">
                <h2>{formData.name}</h2>
                <p className="profile-role">{formData.position}</p>
                <p className="profile-department">{formData.department}</p>
                <div className="profile-badge">
                  <FaShieldAlt /> Employee ID: {formData.employeeId}
                </div>
              </div>
            </div>

            {isEditing ? (
              <div className="profile-bio-edit">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                />
              </div>
            ) : (
              <div className="profile-bio">
                <h3>About</h3>
                <p>{formData.bio}</p>
              </div>
            )}

            <div className="profile-stats">
              <div className="stat-item">
                <h4>3.5</h4>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h4>28</h4>
                <p>Projects</p>
              </div>
              <div className="stat-item">
                <h4>94%</h4>
                <p>Performance</p>
              </div>
            </div>
          </Card>

          {/* Personal Information */}
          <Card title="Personal Information" icon={<FaUser />}>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FaUser />
                </div>
                <div className="info-content">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.name}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.email}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.phone}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <label>Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{formData.address}</p>
                  )}
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaGlobe />
                </div>
                <div className="info-content">
                  <label>Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  ) : (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer">
                      {formData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Employment Details */}
          <Card title="Employment Details" icon={<FaBriefcase />}>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FaBriefcase />
                </div>
                <div className="info-content">
                  <label>Position</label>
                  <p>{formData.position}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaBriefcase />
                </div>
                <div className="info-content">
                  <label>Department</label>
                  <p>{formData.department}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaCalendar />
                </div>
                <div className="info-content">
                  <label>Join Date</label>
                  <p>{formData.joinDate}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaShieldAlt />
                </div>
                <div className="info-content">
                  <label>Employee Type</label>
                  <p>Full-time</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills & Languages */}
          <Card title="Skills & Languages" icon={<FaBriefcase />}>
            <div className="skills-section">
              <h4>Technical Skills</h4>
              <div className="skills-tags">
                {formData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h4>Languages</h4>
              <div className="skills-tags">
                {formData.languages.map((lang, index) => (
                  <span key={index} className="language-tag">{lang}</span>
                ))}
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card title="Security Settings" icon={<FaShieldAlt />}>
            <div className="security-options">
              <button className="security-btn">
                <FaShieldAlt />
                <div>
                  <strong>Change Password</strong>
                  <p>Update your password regularly</p>
                </div>
              </button>
              <button className="security-btn">
                <FaShieldAlt />
                <div>
                  <strong>Two-Factor Authentication</strong>
                  <p>Add an extra layer of security</p>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;