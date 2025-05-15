import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../chat3.css';

const Restaurant = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempCount, setTempCount] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://story-dashboard-backend.onrender.com/api/fetchCategories/category'
        );
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch story whenever the URL category param changes
  useEffect(() => {
    if (category) {
      fetchStory(category);
    }
  }, [category]);

  const fetchStory = async (kw) => {
    setIsLoading(true);
    setError('');
    setPreview('');
    let response = '';

    try {
      if (tempCount % 2 === 1) {
        response = await axios.get(
          `https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test1/${encodeURIComponent(
            kw
          )}`
        );
      } else {
        response = await axios.get(
          `https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test2/${encodeURIComponent(
            kw
          )}`
        );
      }

      if (response.data) {
        setTimeout(() => {
          setPreview(response.data);
        }, 100);
      } else {
        setError('Received empty preview content.');
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't fetch story for that category.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (categories.length === 0) return;
    const nextTempCount = tempCount + 1;
    setTempCount(nextTempCount);

    const currentIndex = categories.indexOf(category);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % categories.length;
    navigate(`/restaurant/${categories[nextIndex]}`);
  };

  const handlePrevious = () => {
    if (categories.length === 0) return;

    const currentIndex = categories.indexOf(category);
    const prevIndex =
      currentIndex === -1
        ? categories.length - 1
        : (currentIndex - 1 + categories.length) % categories.length;

    navigate(`/restaurant/${categories[prevIndex]}`);
  };

  return (
    <div className="story-container">
      <h1>Dish Story Generator</h1>

      {isLoading && <p className="status loading">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {preview && (
        <div className="preview-container">
          <button className="left" onClick={handlePrevious}>
            &#10094;
          </button>

          <div className="preview-wrapper show">
            <iframe
              title="AMP Story Preview"
              srcDoc={preview}
              sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
              width="300"
              height="550"
              style={{
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
              }}
            />
          </div>

          <button className="right" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
