import './App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from './Components/Login Form/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './Components/Appbar/Appbar';
import ListBook from './Components/List Book/ListBook';
import BookDetail from './Components/Detail/BookDetail';
import NotFound from './Components/Not Found/NotFound';
import Cart from './Components/Cart/Cart';

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
    <>
    {!isLoginPage && <Appbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
    <Routes>
      <Route path='/' element={<Navigate to='/book' />} />
      <Route path='/book' element={<ListBook />} />
      <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
      <Route path='/book/:id' element={<BookDetail />}/>
      <Route path='/cart' element={<Cart />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </>
  );
}

export default App;
