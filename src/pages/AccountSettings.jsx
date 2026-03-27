import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountSettings.css';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('popx_user');
    console.log('Stored user:', storedUser); // Debug line
    
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      console.log('No user found, redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('popx_logged_in');
    localStorage.removeItem('popx_user');
    setLogoutMessage('Logged out successfully!');
    
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (!userData) {
    return (
      <div className="account-settings">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="account-settings">
      <div className="settings-header">
        <button className="back-btn" onClick={() => navigate('/')}>←</button>
        <h1 className="settings-title">Account Settings</h1>
      </div>
      
      {logoutMessage && (
        <div className="success-message">
          {logoutMessage}
        </div>
      )}
      
      <div className="settings-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-initials">
              {userData.fullName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userData.fullName}</h2>
            <p className="profile-email">{userData.emailAddress}</p>
          </div>
        </div>
        
        <div className="info-section">
          <div className="info-item">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{userData.phoneNumber || 'Not provided'}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Company Name</span>
            <span className="info-value">{userData.companyName || 'Not provided'}</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Agency</span>
            <span className="info-value">
              {userData.isAgency === 'yes' ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        
        <div className="description-section">
          <p className="description-text">
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;