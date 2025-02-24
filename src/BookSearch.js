import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { acheter, fav } from './actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

export default function BookSearch(){
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setError('Please enter a valid book title');
      setBooks([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?title=${searchQuery}`);
      setBooks(response.data.docs);
      setError('');
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
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
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book Search</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter book title"
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading books...</div>}

      <div className="row">
        {books.length > 0 ? (
          books.map((book, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                {book.cover_i && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                    alt={`Cover of ${book.title}`}
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
                  <Link  onClick={() => handleBuy(book)}  className="btn btn-primary"
                        style={{   padding: '10px 20px',
                          fontSize: '16px',     borderRadius: '10px',  transition: 'all 0.3s ease-in-out',  }}>
                        <FontAwesomeIcon icon={faShoppingCart} /> Buy
                      </Link>
                      <Link   onClick={() => handleFavoriteToggle(book)} className="heart-button"style={{padding: '10px 20px',fontSize: '16px',
                          borderRadius: '10px',
                          transition: 'all 0.3s ease-in-out',
                        }}>
                        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No books found. Try a different title.</p>
          </div>
        )}
      </div>
    </div>
  );
};


