import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import PrivateAdminRoute from './Components/PrivateRoute/PrivateAdminRoute';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults';
import ChangeInformation from './ChangeInformation/ChangeInformation';
import OrderInfo from './Order/OrderInfo/OrderInfo';
import Cart from './Cart/Cart';
import OrderList from './Order/OrderList/OrderList';
import PaymentInfo from './Payment/PaymentInfo/PaymentInfo';
import PaymentList from './Payment/PaymentList/PaymentList';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Admin from './Admin/Admin';
import SignUpAdmin from './Admin/AdminManage/SignUpAdmin';
import UserList from './Admin/UserManage/UserList';
import BookList from './Admin/BookManage/BookList';
import CouponList from './Admin/Coupon/Coupon';
import ChangePassword from './ChangePassword/ChangePassword';
import BoughtProducts from './BoughtProducts/BoughtProduct';
import Statistic from './Admin/Statistic/Statistic';
import CategoryList from './Admin/Category/Category';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/search/genre/:genreName" element={<SearchResults type="genre" />} />
          <Route path="/search/keyword/:keyword" element={<SearchResults type="keyword" />} />
          <Route path="/user/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/user/changeInformation" element={<PrivateRoute><ChangeInformation /></PrivateRoute>} />
          <Route path="/order/list" element={<PrivateRoute><OrderList /></PrivateRoute>} />
          <Route path="/order/info/:orderId" element={<PrivateRoute><OrderInfo /></PrivateRoute>} />
          <Route path="/order/boughtproducts" element={<PrivateRoute><BoughtProducts /></PrivateRoute>} />
          <Route path="/payment/info/:paymentId" element={<PrivateRoute><PaymentInfo /></PrivateRoute>} />
          <Route path="/payment/list" element={<PrivateRoute><PaymentList /></PrivateRoute>} />
          <Route path="/user/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

          <Route path="/admin/*" element={
            <PrivateAdminRoute>
              <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="create" element={<SignUpAdmin />} />
                <Route path="books" element={<BookList />} />
                <Route path="users" element={<UserList />} />
                <Route path='coupon' element={<CouponList />} />
                <Route path='statistic' element={<Statistic />} />
                <Route path='category' element={<CategoryList />} />
              </Routes>
            </PrivateAdminRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
