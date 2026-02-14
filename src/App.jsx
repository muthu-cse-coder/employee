import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import EmployeeDashboard from './pages/employee/Dashboard';
import Profile from './pages/employee/Profile';
import Attendance from './pages/employee/Attendance';
import SalarySlip from './pages/employee/SalarySlip';
import LeaveManagement from './pages/employee/LeaveManagement';
import AdminDashboard from './pages/admin/Dashboard';
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
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
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