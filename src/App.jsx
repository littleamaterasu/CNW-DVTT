import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import './App.css';

import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults'; // Import component for search results
import Book from './Book/Book';
import ChangeInformation from './ChangeInformation/ChangeInformation';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search/genre/:genreName" element={<SearchResults type="genre" />} />
          <Route path="/search/keyword/:keyword" element={<SearchResults type="keyword" />} />
          <Route path="book/id/:id" element={<Book />} />
          <Route path="/user/changeInformation"
            element={
              <PrivateRoute>
                <ChangeInformation />
              </PrivateRoute>
            }
            auth={isAuthenticated} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
