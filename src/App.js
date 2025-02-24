import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearch from './BookSearch';
import Cartt from './Cartt'; 
import AuthorBookSearch from './Auther';
import BookList from './Book';
import Fav from './favrot';
import { FaHome, FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'; 

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <FaHome className="me-2" /> BookStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/search" className="nav-link d-flex align-items-center">
                  <FaSearch className="me-2" /> BookSearch
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/author" className="nav-link d-flex align-items-center">
                  <FaUser className="me-2" /> AuthorBookSearch
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/fav" className="nav-link d-flex align-items-center">
                  <FaHeart className="me-2" /> Favorite
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link d-flex align-items-center">
                  <FaShoppingCart className="me-2" /> Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '80px' }}> 
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/search" element={<BookSearch />} />
          <Route path="/cart" element={<Cartt />} />
          <Route path="/author" element={<AuthorBookSearch />} />
          <Route path="/fav" element={<Fav />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
