import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { acheter, fav } from './actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function AuthorBookSearch(){
  const [authorQuery, setAuthorQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAuthorSearch = async () => {
    if (authorQuery.trim() === '') {
      setError('Please enter a valid author name');
      setBooks([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?author=${authorQuery}`);
      setBooks(response.data.docs);
      setError('');
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (book) => {
    const normalizedBook = {
      key: book.key || book.cover_i || Math.random().toString(36).substring(2),
      title: book.title || 'Unknown Title',
      authors: book.author_name
        ? book.author_name.map((name) => ({ name }))
        : [{ name: 'Unknown Author' }],
      first_publish_year: book.first_publish_year || 'N/A',
      cover_i: book.cover_i || null,
    };

    dispatch(fav(normalizedBook));
  };

  const handleBuy = (book) => {
    const normalizedBook = {
      key: book.key || book.cover_i || Math.random().toString(36).substring(2),
      title: book.title || 'Unknown Title',
      authors: book.author_name
        ? book.author_name.map((name) => ({ name }))
        : [{ name: 'Unknown Author' }],
      first_publish_year: book.first_publish_year || 'N/A',
      cover_i: book.cover_i || null,
    };

    dispatch(acheter(normalizedBook));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        <FontAwesomeIcon icon={faSearch} /> Search Books by Author
      </h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={authorQuery}
          onChange={(e) => setAuthorQuery(e.target.value)}
          placeholder="Enter author name"
        />
        <button className="btn btn-primary" onClick={handleAuthorSearch}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading books...</div>}
      <div className="row">
        {books.length > 0 ? (
          books.map((book, index) => {
            return (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                      alt={`Cover of ${book.title}`}
                      className="card-img-top"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/300x400?text=No+Image"
                      alt="No cover available"
                      className="card-img-top"
                      style={{ height: '300px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">
                      {book.author_name ? book.author_name.join(', ') : 'Unknown author'}
                    </p>
                    <p className="card-text"><small>{book.first_publish_year}</small></p>
                    <div className="d-flex gap-3 justify-content-start mt-3">
                      <Link
                        onClick={() => handleBuy(book)}
                        className="btn btn-primary"
                        style={{
                          padding: '10px 20px',
                          fontSize: '16px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        <FontAwesomeIcon icon={faShoppingCart} /> Buy
                      </Link>
                      <Link
                        onClick={() => handleFavoriteToggle(book)}
                        className="heart-button"
                        style={{
                          padding: '10px 20px',
                          fontSize: '16px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease-in-out',
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <p>No books found for this author. Try a different name.</p>
          </div>
        )}
      </div>
    </div>
  );
};


