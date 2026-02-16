// import { NavLink } from 'react-router-dom';
// import { 
//   FaTachometerAlt,
//   FaUser,
//   FaClock,
//   FaMoneyBillWave,
//   FaCalendarAlt,
//   FaComments,
//   FaBell,
//   FaCog,
//   FaRobot
// } from 'react-icons/fa';
// import './Sidebar.css';

// function Sidebar({ isOpen, userRole }) {
//   const employeeLinks = [
//     { path: '/employee/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
//     { path: '/employee/profile', icon: <FaUser />, label: 'My Profile' },
//     { path: '/employee/attendance', icon: <FaClock />, label: 'Attendance' },
//     { path: '/employee/salary', icon: <FaMoneyBillWave />, label: 'Salary Slip' },
//     { path: '/employee/leave', icon: <FaCalendarAlt />, label: 'Leave Management' },
//     { path: '/employee/chat', icon: <FaComments />, label: 'Live Chat' },
//     { path: '/employee/ai-assistant', icon: <FaRobot />, label: 'AI Assistant' },
//     { path: '/employee/notifications', icon: <FaBell />, label: 'Notifications' },
//     { path: '/employee/settings', icon: <FaCog />, label: 'Settings' },
//   ];

//   const adminLinks = [
//     { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
//     { path: '/admin/employees', icon: <FaUser />, label: 'Employees' },
//     { path: '/admin/attendance', icon: <FaClock />, label: 'Attendance' },
//     { path: '/admin/payroll', icon: <FaMoneyBillWave />, label: 'Payroll' },
//     { path: '/admin/leave-approval', icon: <FaCalendarAlt />, label: 'Leave Approval' },
//     { path: '/admin/reports', icon: <FaBell />, label: 'Reports' },
//     { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
//   ];

//   const links = userRole === 'admin' ? adminLinks : employeeLinks;

//   return (
//     <aside className={`app-sidebar ${isOpen ? 'open' : 'closed'}`}>
//       <nav className="sidebar-nav">
//         <ul className="nav-list">
//           {links.map((link, index) => (
//             <li key={link.path} style={{ animationDelay: `${index * 0.05}s` }}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) => 
//                   `nav-link ${isActive ? 'active' : ''}`
//                 }
//               >
//                 <span className="nav-icon">{link.icon}</span>
//                 <span className="nav-label">{link.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {isOpen && (
//         <div className="sidebar-footer">
//           <div className="footer-card">
//             <div className="footer-icon">
//               <FaRobot />
//             </div>
//             <div className="footer-content">
//               <h4>Need Help?</h4>
//               <p>Ask our AI Assistant</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// }

// export default Sidebar;
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt,
  FaUser,
  FaClock,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaComments,
  FaBell,
  FaCog,
  FaRobot
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen, userRole }) {
  const employeeLinks = [
    { path: '/employee/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/employee/profile', icon: <FaUser />, label: 'My Profile' },
    { path: '/employee/attendance', icon: <FaClock />, label: 'Attendance' },
    { path: '/employee/salary', icon: <FaMoneyBillWave />, label: 'Salary Slip' },
    { path: '/employee/leave', icon: <FaCalendarAlt />, label: 'Leave Management' },
    { path: '/employee/chat', icon: <FaComments />, label: 'Live Chat' },
    { path: '/employee/ai-assistant', icon: <FaRobot />, label: 'AI Assistant' },
    { path: '/employee/notifications', icon: <FaBell />, label: 'Notifications' },
    { path: '/employee/settings', icon: <FaCog />, label: 'Settings' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { path: '/admin/employees', icon: <FaUser />, label: 'Employees' },
    { path: '/admin/attendance', icon: <FaClock />, label: 'Attendance' },
    { path: '/admin/payroll', icon: <FaMoneyBillWave />, label: 'Payroll' },
    { path: '/admin/leave-approval', icon: <FaCalendarAlt />, label: 'Leave Approval' },
    { path: '/admin/reports', icon: <FaBell />, label: 'Reports' },
    { path: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  ];

  const links = userRole === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {links.map((link, index) => (
            <li key={link.path} style={{ animationDelay: `${index * 0.05}s` }}>
              <NavLink
                to={link.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          <div className="footer-card">
            <div className="footer-icon">
              <FaRobot />
            </div>
            <div className="footer-content">
              <h4>Need Help?</h4>
              <p>Ask our AI Assistant</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;