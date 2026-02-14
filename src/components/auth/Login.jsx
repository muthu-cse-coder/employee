// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   FaUser, 
//   FaLock, 
//   FaEye, 
//   FaEyeSlash, 
//   FaUserTie, 
//   FaUsers,
//   FaCheckCircle,
//   FaShieldAlt,
//   FaChartLine,
//   FaClock,
//   FaExclamationCircle
// } from 'react-icons/fa';
// import '../../assets/styles/auth.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
  
//   const [role, setRole] = useState('employee');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       return;
//     }
    
//     if (!email.includes('@')) {
//       setError('Please enter a valid email address');
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
    
//     try {
//       setLoading(true);
//       const result = await login({ email, password, role, rememberMe });
      
//       if (result.success) {
//         // Navigate based on role
//         if (role === 'admin') {
//           navigate('/admin/dashboard');
//         } else {
//           navigate('/employee/dashboard');
//         }
//       }
//     } catch (err) {
//       setError(err.message || 'Login failed. Please try again.');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       {/* Animated Background */}
//       <div className="auth-background">
//         <div className="particles">
//           <div className="particle"></div>
//           <div className="particle"></div>
//           <div className="particle"></div>
//           <div className="particle"></div>
//           <div className="particle"></div>
//           <div className="particle"></div>
//         </div>
//       </div>

//       <div className="auth-content">
//         {/* Left Panel - Branding */}
//         <div className="auth-left">
//           <div className="brand-section">
//             <div className="brand-logo">
//               <div className="logo-r">R</div>
//             </div>
            
//             <h1 className="brand-title">RiserOne</h1>
//             <p className="brand-subtitle">Employee Management System</p>
            
//             <p className="brand-description">
//               Streamline your workforce management with our cutting-edge platform. 
//               Experience seamless attendance tracking, payroll management, and real-time analytics.
//             </p>
            
//             <div className="brand-features">
//               <div className="feature-item">
//                 <FaCheckCircle className="feature-icon" />
//                 <span>Smart Attendance</span>
//               </div>
//               <div className="feature-item">
//                 <FaShieldAlt className="feature-icon" />
//                 <span>Secure & Reliable</span>
//               </div>
//               <div className="feature-item">
//                 <FaChartLine className="feature-icon" />
//                 <span>Real-time Analytics</span>
//               </div>
//               <div className="feature-item">
//                 <FaClock className="feature-icon" />
//                 <span>24/7 Access</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Login Form */}
//         <div className="auth-right">
//           <div className="login-card">
//             <div className="login-header">
//               <h2 className="login-title">Welcome Back</h2>
//               <p className="login-subtitle">Sign in to continue to your account</p>
//             </div>

//             {/* Role Selector */}
//             <div className="role-selector">
//               <button
//                 type="button"
//                 className={`role-option ${role === 'employee' ? 'active' : ''}`}
//                 onClick={() => setRole('employee')}
//               >
//                 <FaUsers style={{ marginRight: '8px' }} />
//                 Employee
//               </button>
//               <button
//                 type="button"
//                 className={`role-option ${role === 'admin' ? 'active' : ''}`}
//                 onClick={() => setRole('admin')}
//               >
//                 <FaUserTie style={{ marginRight: '8px' }} />
//                 Admin
//               </button>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="error-message">
//                 <FaExclamationCircle />
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Login Form */}
//             <form onSubmit={handleSubmit} className="login-form">
//               <div className="form-group">
//                 <label htmlFor="email" className="form-label">Email Address</label>
//                 <div className="form-input-wrapper">
//                   <FaUser className="input-icon" />
//                   <input
//                     type="email"
//                     id="email"
//                     className="form-input"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     disabled={loading}
//                     autoComplete="email"
//                   />
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">Password</label>
//                 <div className="form-input-wrapper">
//                   <FaLock className="input-icon" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     className="form-input"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     disabled={loading}
//                     autoComplete="current-password"
//                   />
//                   <button
//                     type="button"
//                     className="password-toggle"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={showPassword ? 'Hide password' : 'Show password'}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               <div className="form-options">
//                 <label className="remember-me">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     disabled={loading}
//                   />
//                   <span>Remember me</span>
//                 </label>
//                 <a href="#" className="forgot-password">Forgot password?</a>
//               </div>

//               <button 
//                 type="submit" 
//                 className={`login-button ${loading ? 'loading' : ''}`}
//                 disabled={loading}
//               >
//                 {loading && <div className="button-loader"></div>}
//                 <div className="button-content">
//                   <span>Sign In</span>
//                   <FaCheckCircle />
//                 </div>
//               </button>
//             </form>

//             <div className="auth-footer">
//               <p>
//                 Don't have an account?
//                 <a href="#">Contact Administrator</a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserTie, 
  FaUsers,
  FaCheckCircle,
  FaShieldAlt,
  FaChartLine,
  FaClock,
  FaExclamationCircle
} from 'react-icons/fa';
import '../../assets/styles/auth.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      const result = await login({ email, password, role, rememberMe });
      
      if (result.success) {
        // Navigate based on role
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/employee/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      <div className="auth-content">
        {/* Left Panel - Branding */}
        <div className="auth-left">
          <div className="brand-section">
            <div className="brand-logo">
              <div className="logo-r">R</div>
            </div>
            
            <h1 className="brand-title">RiserOne</h1>
            <p className="brand-subtitle">Employee Management System</p>
            
            <p className="brand-description">
              Streamline your workforce management with our cutting-edge platform. 
              Experience seamless attendance tracking, payroll management, and real-time analytics.
            </p>
            
            <div className="brand-features">
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>Smart Attendance</span>
              </div>
              <div className="feature-item">
                <FaShieldAlt className="feature-icon" />
                <span>Secure & Reliable</span>
              </div>
              <div className="feature-item">
                <FaChartLine className="feature-icon" />
                <span>Real-time Analytics</span>
              </div>
              <div className="feature-item">
                <FaClock className="feature-icon" />
                <span>24/7 Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="auth-right">
          <div className="login-card">
            <div className="login-header">
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to continue to your account</p>
            </div>

            {/* Role Selector */}
            <div className="role-selector">
              <button
                type="button"
                className={`role-option ${role === 'employee' ? 'active' : ''}`}
                onClick={() => setRole('employee')}
              >
                <FaUsers style={{ marginRight: '8px' }} />
                Employee
              </button>
              <button
                type="button"
                className={`role-option ${role === 'admin' ? 'active' : ''}`}
                onClick={() => setRole('admin')}
              >
                <FaUserTie style={{ marginRight: '8px' }} />
                Admin
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="form-input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading && <div className="button-loader"></div>}
                <div className="button-content">
                  <span>Sign In</span>
                  <FaCheckCircle />
                </div>
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Don't have an account?
                <a href="#">Contact Administrator</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;