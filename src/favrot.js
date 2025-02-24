import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { supprimerF } from './actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'; 

export default function Fav () {
  const books = useSelector((state) => state.fav);
  const dispatch = useDispatch();
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-info">
        Your Favorite Books
        <span className="badge bg-primary ms-3">{books.length}</span>
      </h1>
      {books.length > 0 ? (
        <div className="row">
          {books.map((book) => (
            <div key={book.key} className="col-md-4 mb-4">
              <div className="card shadow-lg rounded border-0 hover-shadow">
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i || book.cover_id || 'default'}-L.jpg`}
                  alt={`Cover of ${book.title}`}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{book.title}</h5>
                  <p className="card-text text-muted">
                    {book.authors && book.authors.length > 0
                      ? book.authors.map((author) => author.name).join(', ')
                      : 'Unknown Author'}
                  </p>
                  <p className="card-text">
                    <small>
                      <strong>Published:</strong> {book.first_publish_year || 'N/A'}
                    </small>
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button
                      onClick={() => dispatch(supprimerF(book.key))}
                      className="btn btn-danger btn-lg" style={{ padding: '10px 20px',   fontSize: '16px',   borderRadius: '25px',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      Remove <FontAwesomeIcon icon={faHeartBroken} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
          <FontAwesomeIcon   icon={faHeartBroken}  className="text-danger"  style={{ fontSize: '50px', marginBottom: '20px' }}  />
          <div className="alert alert-warning">
            No favorite books yet. Start adding some books to your favorites!
          </div>
        </div>
      )}
    </div>
  );
};


