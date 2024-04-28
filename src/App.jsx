import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import SearchResults from './SearchResults/SearchResults'; // Import component for search results
import './App.css';
import Book from './Book/Book';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search/genre/:genreName" element={<SearchResults type="genre" />} /> {/* Route for searching by genre */}
          <Route path="/search/keyword/:keyword" element={<SearchResults type="keyword" />} /> {/* Route for searching by keyword */}
          <Route path="book/id/:id" element={<Book />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
``;
