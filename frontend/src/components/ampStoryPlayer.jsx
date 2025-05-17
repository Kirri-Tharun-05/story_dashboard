import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../chat3.css';
import '../UrlAnimation.css';

const Restaurant = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const playerRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempCount, setTempCount] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    if (category) {
      generatePreviewUrl(category);
    }
  }, [category]);

  const generatePreviewUrl = (kw) => {
    setIsLoading(true);
    setError('');
    setIsLoaded(false);
    const baseUrl = 'https://story-dashboard-backend.onrender.com/stories';

    const endpoint = tempCount % 2 === 1 ? 'test1' : 'test2';
    const fullUrl = `${baseUrl}/${endpoint}/${encodeURIComponent(kw)}`;

    setPreviewUrl(fullUrl);
    setIframeKey(prev => prev + 1); // just to force refresh
    setIsLoading(false);
  };

  const handleDirectionChange = (dir) => {
    if (categories.length === 0) return;

    setIsLoaded(false);
    setAnimationClass(dir === 'next' ? 'slide-out-left' : 'slide-out-right');

    setTimeout(() => {
      const newTempCount = tempCount + 1;
      setTempCount(newTempCount);

      const currentIndex = categories.indexOf(category);
      const newIndex =
        dir === 'next'
          ? (currentIndex + 1) % categories.length
          : (currentIndex - 1 + categories.length) % categories.length;

      navigate(`/ampStoryPlayer/restaurant/${categories[newIndex]}`);
    }, 400);
  };

  const handleNext = () => handleDirectionChange('next');
  const handlePrevious = () => handleDirectionChange('prev');

  useEffect(() => {
    if (playerRef.current && previewUrl) {
      playerRef.current.innerHTML = ''; // Clear previous story
      const storyEl = document.createElement('amp-story-player');
      storyEl.style.width = '300px';
      storyEl.style.height = '550px';

      const story = document.createElement('a');
      story.href = previewUrl;
      story.setAttribute('data-param-autoplay', 'true');

      storyEl.appendChild(story);
      playerRef.current.appendChild(storyEl);

      // Load AMP Story Player JS dynamically if not already loaded
      if (!window.customElements.get('amp-story-player')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.ampproject.org/amp-story-player-v0.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [previewUrl, iframeKey]);

  return (
    <div className="story-container">
      <h1>Dish Story Generator</h1>
      {error && <p className="status error">{error}</p>}
      <div className="preview-container">
        <button className="left" onClick={handlePrevious}>
          &nbsp;&#10094;&nbsp;
        </button>

        <div className={`preview-wrapper show ${animationClass}`}>
          <div ref={playerRef} />
        </div>

        <button className="right" onClick={handleNext}>
          &nbsp;&#10095;&nbsp;
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
