import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../chat3.css';
import '../UrlAnimation.css';

const Restaurant = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempCount, setTempCount] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [iframeKey, setIframeKey] = useState(0); // to force reload iframe
  const [isLoaded, setIsLoaded] = useState(false); // iframe loaded state

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

  // Fetch story when category changes
  useEffect(() => {
    if (category) {
      fetchStory(category);
    }
  }, [category]);

  const fetchStory = async (kw) => {
    setIsLoading(true);
    setError('');
    setIsLoaded(false);
    let response = '';

    try {
      const endpoint =
        tempCount % 2 === 1
          ? `https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test1/${encodeURIComponent(kw)}`
          : `https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/test2/${encodeURIComponent(kw)}`;

      response = await axios.get(endpoint);

      if (response.data) {
        setAnimationClass('');  // reset animation class
        setPreview('');         // clear previous preview

        // Delay update preview until iframe load event triggers visibility
        setTimeout(() => {
          setPreview(response.data);
          setIframeKey(prev => prev + 1); // force iframe reload
        }, 50);
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

  const handleDirectionChange = (dir) => {
    if (categories.length === 0) return;

    setIsLoaded(false); // hide iframe immediately
    setAnimationClass(dir === 'next' ? 'slide-out-left' : 'slide-out-right');

    setTimeout(() => {
      const newTempCount = tempCount + 1;
      setTempCount(newTempCount);

      const currentIndex = categories.indexOf(category);
      const newIndex =
        dir === 'next'
          ? (currentIndex + 1) % categories.length
          : (currentIndex - 1 + categories.length) % categories.length;

      navigate(`/restaurant/${categories[newIndex]}`);
    }, 400);
  };

  const handleNext = () => handleDirectionChange('next');
  const handlePrevious = () => handleDirectionChange('prev');

  const onIframeLoad = () => {
    // once iframe content is fully loaded, trigger fade-in animation & show shadow
    setAnimationClass('fade-in');
    setIsLoaded(true);
  };

  return (
    <div className="story-container">
       <h1>Dish Story Generator</h1>
      {error && <p className="status error">{error}</p>}
      <div className="preview-container">
        <button className="left" onClick={handlePrevious}> 
          &nbsp;&#10094;&nbsp; 
        </button>

        <div className="preview-wrapper show">
          {preview && (
            <iframe
              key={iframeKey}
              title="AMP Story Preview"
              srcDoc={preview}
              sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
              width="300"
              height="550"
              className={animationClass}
              onLoad={onIframeLoad}
              style={{
                border: 'none',
                borderRadius: '16px',
                boxShadow: isLoaded ? '0 8px 16px rgba(0, 0, 0, 0.2),0 4px 8px rgba(0, 0, 0, 0.12);' : 'none',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
              }}
            />
          )}
        </div>

        <button className="right" onClick={handleNext}>
          &nbsp;&#10095;&nbsp;
        </button>
      </div>
    </div>
  );
};

export default Restaurant;

