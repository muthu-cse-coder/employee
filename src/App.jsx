import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import EmployeeDashboard from './pages/employee/Dashboard';
import Profile from './pages/employee/Profile';
import Attendance from './pages/employee/Attendance';
import SalarySlip from './pages/employee/SalarySlip';
import LeaveManagement from './pages/employee/LeaveManagement';
import Chat from './pages/employee/Chat';
import Notifications from './pages/employee/Notifications';
import AdminDashboard from './pages/admin/Dashboard';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import LeaveApproval from './pages/admin/LeaveApproval';
import AttendanceManagement from './pages/admin/Attendancemanagement';
import PayrollManagement from './pages/admin/Payrollmanagement';
import ReportsAnalytics from './pages/admin/ReportsAnalytics';
import Settings from './pages/admin/Settings';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Employee Routes */}
          <Route 
            path="/employee/dashboard" 
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/profile" 
            element={
              <ProtectedRoute requiredRole="employee">
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/attendance" 
            element={
              <ProtectedRoute requiredRole="employee">
                <Attendance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/salary" 
            element={
              <ProtectedRoute requiredRole="employee">
                <SalarySlip />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/leave" 
            element={
              <ProtectedRoute requiredRole="employee">
                <LeaveManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/chat" 
            element={
              <ProtectedRoute requiredRole="employee">
                <Chat />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee/notifications" 
            element={
              <ProtectedRoute requiredRole="employee">
                <Notifications />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/employees" 
            element={
              <ProtectedRoute requiredRole="admin">
                <EmployeeManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/leave-approval" 
            element={
              <ProtectedRoute requiredRole="admin">
                <LeaveApproval />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/attendance" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AttendanceManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/payroll" 
            element={
              <ProtectedRoute requiredRole="admin">
                <PayrollManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute requiredRole="admin">
                <ReportsAnalytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;