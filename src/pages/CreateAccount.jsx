import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    password: '',
    companyName: '',
    isAgency: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.isAgency) {
      newErrors.isAgency = 'Please select an option';
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

  const handleRadioChange = (value) => {
    setFormData(prev => ({ ...prev, isAgency: value }));
    if (errors.isAgency) {
      setErrors(prev => ({ ...prev, isAgency: '' }));
    }
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Store user data
      const userData = {
        fullName: formData.fullName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        isAgency: formData.isAgency
      };
      localStorage.setItem('popx_user', JSON.stringify(userData));
      setSuccessMessage('Account created successfully!');
      
      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="create-account">
      <div className="form-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1 className="form-title">Create your PopX account</h1>
      </div>
      
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="account-form">
        <div className="form-group">
          <label className="form-label">
            Full Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Marry Doe"
            value={formData.fullName}
            onChange={handleChange}
            className={`form-input ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Phone number <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="9876543210"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Email address <span className="required">*</span>
          </label>
          <input
            type="email"
            name="emailAddress"
            placeholder="marry@example.com"
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
              placeholder="••••••••"
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
        
        <div className="form-group">
          <label className="form-label">
            Company name <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Are you an Agency? <span className="required">*</span>
          </label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === 'yes'}
                onChange={() => handleRadioChange('yes')}
              />
              <span className="radio-custom"></span>
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={formData.isAgency === 'no'}
                onChange={() => handleRadioChange('no')}
              />
              <span className="radio-custom"></span>
              No
            </label>
          </div>
          {errors.isAgency && <span className="error-message">{errors.isAgency}</span>}
        </div>
        
        <button type="submit" className="submit-btn">
          Create Account
        </button>
        
        <p className="terms-text">
          By creating an account, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;