import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults'; // Import component for search results
import Book from './Book/Book';
import ChangeInformation from './ChangeInformation/ChangeInformation';
import OrderInfo from './Order/OrderInfo/OrderInfo';
import FAQ from './FAQ/FAQ';
import Cart from './Cart/Cart';
import OrderList from './Order/OrderList/OrderList';
import PaymentInfo from './Payment/PaymentInfo/PaymentInfo';
import PaymentList from './Payment/PaymenList/PaymentList';
import Admin from './Admin/Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();

  const onLogin = () => {
    setIsAuthenticated(true);
    // if (isAuthenticated) navigate('/');
  };

  const onLogout = () => {
    setIsAuthenticated(false);
    // if (!isAuthenticated) navigate('/');
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={onLogin} onLogout={onLogout} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search/genre/:genreName" element={<SearchResults type="genre" />} />
          <Route path="/search/keyword/:keyword" element={<SearchResults type="keyword" />} />
          <Route path="book/id/:id" element={<Book />} />
          <Route path="/user/FAQ" element={<FAQ />} />
          <Route path='user/cart' element={<Cart />} />
          <Route path="/user/changeInformation" element={<ChangeInformation />} />
          <Route path="/order/list" element={<OrderList />} />
          <Route path="/order/info/:id"
            element={
              // <PrivateRoute auth={isAuthenticated}>
              <OrderInfo />
              // { </PrivateRoute> }
            }
          />
          <Route path="/payment/info/:id"
            element={
              // <PrivateRoute auth={isAuthenticated}>
              <PaymentInfo />
              // { </PrivateRoute> }
            }
          />
          <Route path="/payment/list"
            element={
              // <PrivateRoute auth={isAuthenticated}>
              <PaymentList />
              // { </PrivateRoute> }
            }
          />

          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
