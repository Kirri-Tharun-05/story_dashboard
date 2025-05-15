
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../chat3.css';

const Restaurant = () => {
  const [categories, setCategories] = useState([]);       // categories from DB
  const [currentIndex, setCurrentIndex] = useState(-1);   // -1 means no category selected yet
  const [keyword, setKeyword] = useState('');             // user input or category keyword
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempCount, setTempCount] = useState(0);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://story-dashboard-backend.onrender.com/api/fetchCategories/category');

        setCategories(res.data);
        // No auto-fetch story here
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Fetch story preview by keyword
  const fetchStory = async (kw) => {
    setIsLoading(true);
    setError('');
    setPreview('');
    let response='';
    try {
      if (tempCount & 1) {
        console.log("Inside If Condition");
        response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test1/${encodeURIComponent(kw)}`);
        
      }
      else {
        console.log('Inside else Condition ');
        response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test2/${encodeURIComponent(kw)}`);
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
      setError("Couldn't fetch story for that keyword.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle manual input change
  const handleChange = (e) => {
    setKeyword(e.target.value);
    setCurrentIndex(-1); // Reset category selection when typing manually
  };

  // Handle submit (button click or Enter key)
  const handleSubmit = (e, isButtonClicked = false) => {
    if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
      console.log(tempCount);
      const nextTempCount = tempCount + 1;
      setTempCount(nextTempCount);
      console.log(tempCount);
      fetchStory(keyword);
      setCurrentIndex(-1); // reset index because user input overrides category cycling
    }
  };

  // Cycle to next category and fetch story
  const handleNext = () => {
    if (categories.length === 0) return;
    const nextTempCount = tempCount + 1;
    setTempCount(nextTempCount)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % categories.length;
    setCurrentIndex(nextIndex);

    const nextKeyword = categories[nextIndex];
    setKeyword(nextKeyword);
    fetchStory(nextKeyword);
  };

  // Cycle to previous category and fetch story
  const handlePrevious = () => {
    if (categories.length === 0) return;

    const prevIndex = currentIndex === -1
      ? categories.length - 1
      : (currentIndex - 1 + categories.length) % categories.length;

    setCurrentIndex(prevIndex);

    const prevKeyword = categories[prevIndex];
    setKeyword(prevKeyword);
    fetchStory(prevKeyword);
  };

  return (
    <div className="story-container">
      <h1>Dish Story Generator</h1>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            placeholder="Search a Category"
          />
          <button onClick={(e) => handleSubmit(e, true)}>Create</button>
        </div>
      </div>

      {isLoading && <p className="status loading">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {/* ONLY render preview container if we have a preview */}
      {preview && (
        <div className="preview-container">
          <button className="left" onClick={handlePrevious}>&#10094;</button>

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

          <button className="right" onClick={handleNext}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
