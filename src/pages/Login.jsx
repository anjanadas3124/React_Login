import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUser = localStorage.getItem('popx_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.emailAddress === formData.emailAddress) {
          // Store login session
          localStorage.setItem('popx_logged_in', 'true');
          setSuccessMessage('Login successful! Redirecting...');
          
          // Navigate to account settings after 1 second
          setTimeout(() => {
            navigate('/account-settings');
          }, 1000);
        } else {
          setErrors({ ...errors, emailAddress: 'Email not found. Please create an account.' });
        }
      } else {
        setErrors({ ...errors, emailAddress: 'No account found. Please create an account first.' });
      }
    }
  };

  return (
    <div className="login">
      <div className="login-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
      </div>
      
      <div className="login-content">
        <h1 className="login-title">Sign in to your PopX account</h1>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              name="emailAddress"
              placeholder="Enter email address"
              value={formData.emailAddress}
              onChange={handleChange}
              className={`form-input ${errors.emailAddress ? 'error' : ''}`}
            />
            {errors.emailAddress && <span className="error-message">{errors.emailAddress}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Password <span className="required">*</span>
            </label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        
        <div className="signup-prompt">
          <p>
            Don't have an account?{' '}
            <button 
              className="link-btn"
              onClick={() => navigate('/create-account')}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;