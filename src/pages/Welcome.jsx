import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome-content">
        <div className="logo-section">
          <div className="logo">PopX</div>
        </div>
        
        <h1 className="welcome-title">
          Welcome to <span className="highlight">PopX</span>
        </h1>
        
        <p className="welcome-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        
        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/create-account')}
          >
            Create Account
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
      
      <div className="welcome-footer">
        <p className="footer-text">Join thousands of happy users 🚀</p>
      </div>
    </div>
  );
};

export default Welcome;