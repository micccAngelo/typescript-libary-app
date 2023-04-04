import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import LoginForm from './Components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (user_id: string) => {
    localStorage.setItem('user_id', user_id);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    if (user_id) {
      setIsLoggedIn(true);
    }
    else{
      navigate('/login');
    }
  }, [navigate]);

  const isLoginPage = window.location.pathname === '/login';

  return (
    <div className="App">
      <LoginForm onLogin={handleLogin}/>
    </div>
  );
}

export default App;
