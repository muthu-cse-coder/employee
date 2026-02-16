import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaBell, 
  FaUser, 
  FaCog, 
  FaSignOutAlt, 
  FaMoon, 
  FaSun,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Header.css';
// ✅ SVG Logo Import
import logo from '../../assets/images/s.svg';

function Header({ onToggleSidebar, isSidebarOpen }) {
  const navigate = useNavigate();
  const { user, logout, theme, toggleTheme } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <div className="header-logo">
          {/* ✅ SVG Logo Replace */}
          {/* <img src={logo} alt="RiserOne Logo" className="header-logo-image" /> */}
          <span className="logo-text">Test</span>
        </div>
      </div>

      <div className="header-right">
        {/* Theme Toggle */}
        <button 
          className="icon-button theme-toggle" 
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <button 
          className="icon-button notification-button"
          onClick={() => navigate('/employee/notifications')}
        >
          <FaBell />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>

        {/* User Menu */}
        <div className="user-menu-container">
          <button 
            className="user-menu-trigger"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <FaUser />
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </div>
          </button>

          {showUserMenu && (
            <>
              <div 
                className="menu-overlay" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <div className="user-avatar large">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="user-details">
                    <strong>{user?.name}</strong>
                    <p>{user?.email}</p>
                    <span className="user-badge">{user?.role}</span>
                  </div>
                </div>

                <div className="dropdown-divider" />

                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/employee/profile');
                  }}
                >
                  <FaUser />
                  <span>My Profile</span>
                </button>

                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/employee/settings');
                  }}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>

                <div className="dropdown-divider" />

                <button 
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   FaBell, 
//   FaUser, 
//   FaCog, 
//   FaSignOutAlt, 
//   FaMoon, 
//   FaSun,
//   FaBars,
//   FaTimes
// } from 'react-icons/fa';
// import './Header.css';
// // ✅ SVG Logo Import
// import logo from '../../assets/images/s.svg';

// function Header({ onToggleSidebar, isSidebarOpen }) {
//   const navigate = useNavigate();
//   const { user, logout, theme, toggleTheme } = useAuth();
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [notifications] = useState(3); // Mock notification count

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <header className="app-header">
//       <div className="header-left">
//         <button 
//           className="sidebar-toggle" 
//           onClick={onToggleSidebar}
//           aria-label="Toggle sidebar"
//         >
//           {isSidebarOpen ? <FaTimes /> : <FaBars />}
//         </button>
        
      
//         <div className="header-logo">
//           {/* ✅ SVG Logo Replace */}
//           <img src={logo} alt="RiserOne Logo" className="header-logo-image" />
//           <span className="logo-text">RiserOne</span>
//         </div>
//       </div>

//       <div className="header-right">
//         {/* Theme Toggle */}
//         <button 
//           className="icon-button theme-toggle" 
//           onClick={toggleTheme}
//           aria-label="Toggle theme"
//         >
//           {theme === 'dark' ? <FaSun /> : <FaMoon />}
//         </button>

//         {/* Notifications */}
//         <button 
//           className="icon-button notification-button"
//           onClick={() => navigate('/employee/notifications')}
//         >
//           <FaBell />
//           {notifications > 0 && (
//             <span className="notification-badge">{notifications}</span>
//           )}
//         </button>

//         {/* User Menu */}
//         <div className="user-menu-container">
//           <button 
//             className="user-menu-trigger"
//             onClick={() => setShowUserMenu(!showUserMenu)}
//           >
//             <div className="user-avatar">
//               {user?.avatar ? (
//                 <img src={user.avatar} alt={user.name} />
//               ) : (
//                 <FaUser />
//               )}
//             </div>
//             <div className="user-info">
//               <span className="user-name">{user?.name}</span>
//               <span className="user-role">{user?.role}</span>
//             </div>
//           </button>

//           {showUserMenu && (
//             <>
//               <div 
//                 className="menu-overlay" 
//                 onClick={() => setShowUserMenu(false)}
//               />
//               <div className="user-dropdown">
//                 <div className="dropdown-header">
//                   <div className="user-avatar large">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt={user.name} />
//                     ) : (
//                       <FaUser />
//                     )}
//                   </div>
//                   <div className="user-details">
//                     <strong>{user?.name}</strong>
//                     <p>{user?.email}</p>
//                     <span className="user-badge">{user?.role}</span>
//                   </div>
//                 </div>

//                 <div className="dropdown-divider" />

//                 <button 
//                   className="dropdown-item"
//                   onClick={() => {
//                     setShowUserMenu(false);
//                     const profilePath = user?.role === 'admin' ? '/admin/settings' : '/employee/profile';
//                     navigate(profilePath);
//                   }}
//                 >
//                   <FaUser />
//                   <span>My Profile</span>
//                 </button>

//                 <button 
//                   className="dropdown-item"
//                   onClick={() => {
//                     setShowUserMenu(false);
//                     const settingsPath = user?.role === 'admin' ? '/admin/settings' : '/employee/settings';
//                     navigate(settingsPath);
//                   }}
//                 >
//                   <FaCog />
//                   <span>Settings</span>
//                 </button>

//                 <div className="dropdown-divider" />

//                 <button 
//                   className="dropdown-item logout"
//                   onClick={handleLogout}
//                 >
//                   <FaSignOutAlt />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;