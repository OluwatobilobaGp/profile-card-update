import React, { useReducer, useEffect } from 'react';
import './ProductView.css';

const initialState = {
  status: 'loading', // 'loading' | 'success' | 'error'
  data: null,
  error: null,
};

function productReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { 
        status: 'loading', 
        data: null, 
        error: null 
    };
    case 'FETCH_SUCCESS':
      return { 
        status: 'success', 
        data: action.payload, 
        error: null 
    };
    case 'FETCH_ERROR':
      return { 
        status: 'error', 
        data: null, 
        error: action.payload 
    };
    default:
      return state;
  }
}

export function ProductCard({ productId = 1 }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }

        const rawData = await response.json();
        // Handle whether the endpoint returns an array or direct object
        const item = Array.isArray(rawData) ? rawData[0] : rawData;

        dispatch({ type: 'FETCH_SUCCESS', payload: item });
      } catch (err) {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', payload: err.message || 'Could not load product.' });
        }
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  return (
    <div className="card-container">
      {/* 1. SKELETON STATE */}
      {state.status === 'loading' && (
        <div className="skeleton-wrapper" aria-busy="true" aria-label="Loading product details">
          <div className="skeleton skeleton-image" />
          <div className="skeleton skeleton-badge" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-desc" />
          <div className="skeleton skeleton-footer" />
        </div>
      )}

      {/* 2. ERROR STATE */}
      {state.status === 'error' && (
        <div className="error-box fade-in" role="alert">
          <p>{state.error}</p>
          <button
            className="retry-btn"
            onClick={() => {
              // Quick trigger: forces a re-fetch without mounting issues
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* 3. SUCCESS / FULFILLED STATE */}
      {state.status === 'success' && state.data && (
        <article className="product-view fade-in">
          <div className="product-image-box">
            <img
              src={state.data.image}
              alt={state.data.title}
              className="product-image"
              loading="lazy"
            />
          </div>

          <span className="category-tag">{state.data.category}</span>
          <h2 className="product-title">{state.data.title}</h2>
          <p className="product-desc">{state.data.description}</p>

          <div className="product-footer">
            <span className="product-price">${state.data.price?.toFixed(2)}</span>
            <span className="rating-badge">
              ★ {state.data.rating?.rate} ({state.data.rating?.count})
            </span>
          </div>
        </article>
      )}
    </div>
  );
}