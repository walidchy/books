import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { acheter, fav } from './actions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faShoppingCart, faHeart, faBook } from '@fortawesome/free-solid-svg-icons';

export default function BookList()
{
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    year: '',
    hasCover: false,
    genre: '',
  });
  const dispatch = useDispatch();

  const allowedGenres = [
    'romance',
    'science',
    'Mathematics',
    'Physics',
    'Biology',
    'Astronomy',
    'Chemistry',
    'Engineering',
    'Technology',
  ];

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://openlibrary.org/subjects/science.json?limit=1000');
        const booksData = response.data.works;

        setBooks(booksData);
        setFilteredBooks(booksData);

        setError('');
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  const applyFilters = () => {
    let filtered = [...books];
    if (filters.year) {
      filtered = filtered.filter(
        (book) => book.first_publish_year && book.first_publish_year >= filters.year
      );
    }
    if (filters.hasCover) {
      filtered = filtered.filter((book) => book.cover_id);
    }
    if (filters.genre) {
      filtered = filtered.filter((book) =>
        book.subject && book.subject.some((sub) => sub.toLowerCase() === filters.genre.toLowerCase())
      );
    }
    setFilteredBooks(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">
        <FontAwesomeIcon icon={faBook} /> Explore Books
      </h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading books...</div>}

      <div className="mb-4">
        <h5 className="text-secondary">
          <FontAwesomeIcon icon={faFilter} /> Filters
        </h5>
        <div className="d-flex gap-3 mb-3 flex-wrap">
          <div className="filter-group">
            <label htmlFor="year" className="form-label">Publication Year (after):</label>
            <input
              type="number"
              id="year"
              name="year"
              value={filters.year}
              onChange={handleFilterChange}
              className="form-control shadow-sm"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="hasCover" className="form-label">Has Cover:</label>
            <input
              type="checkbox"
              id="hasCover"
              name="hasCover"
              checked={filters.hasCover}
              onChange={handleFilterChange}
              className="form-check-input ms-2"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="genre" className="form-label">Genre:</label>
            <select
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="form-select shadow-sm"
            >
              <option value="">Select Genre</option>
              {allowedGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.key} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100 hover-effect">
                {book.cover_id && (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                    alt={`Cover of ${book.title}`}
                    className="card-img-top"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    {book.authors && book.authors.length > 0
                      ? book.authors.map((author) => author.name).join(', ')
                      : 'Unknown author'}
                  </p>
                  <p className="card-text">
                    <small>First Published: {book.first_publish_year || 'N/A'}</small>
                  </p>
                  <Link
                    to={`/`}
                    onClick={() => dispatch(acheter(book))}
                    className="btn btn-primary me-2"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} /> Buy
                  </Link>
                  <Link
                      onClick={() => dispatch(fav(book))}
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
          ))
        ) : (
          <div className="col-12">
            <p>No books found matching the filters. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

