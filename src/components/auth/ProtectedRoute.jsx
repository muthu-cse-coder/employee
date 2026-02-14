// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ children, requiredRole }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex-center" style={{ minHeight: '100vh' }}>
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user.role !== requiredRole) {
//     // Redirect to appropriate dashboard based on actual role
//     const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard';
//     return <Navigate to={redirectPath} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    const redirectPath = user.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}

export default ProtectedRoute;