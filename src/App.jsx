import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import AccountSettings from './pages/AccountSettings';
import './App.css';

function App() {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('popx_user') !== null;

  return (
    <Router>
      <div className="app-container">
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/account-settings" 
              element={isLoggedIn ? <AccountSettings /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;