import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const StorySlideChat = () => {
    const [keyword, setKeyword] = useState('');
    const [storyUrl, setStoryUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const playerRef = useRef(null);

    const handleChange = (e) => setKeyword(e.target.value);

    const fetchStory = async () => {
        if (keyword.trim() === '') return;

        setIsLoading(true);
        setError('');
        setStoryUrl('');

        try {
            const response = await axios.get(`http://localhost:5000/api/generateStory/${keyword}`);
            if (response.status === 200) {
                const storyFile = `${encodeURIComponent(keyword)}.html`;
                const fullUrl = `http://localhost:5000/stories/${storyFile}`;
                setStoryUrl(fullUrl);
            } else {
                setError('Failed to generate story.');
            }
        } catch (err) {
            console.error(err);
            setError("Couldn't fetch story for that keyword.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') fetchStory();
    };

    const handleClick = () => fetchStory();

    // Inject AMP player script and stylesheet once
    useEffect(() => {
        if (!document.querySelector('script[src*="amp-story-player"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.ampproject.org/amp-story-player-v0.js';
            script.async = true;
            document.body.appendChild(script);

            const link = document.createElement('link');
            link.href = 'https://cdn.ampproject.org/amp-story-player-v0.css';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, []);

    // Render story inside amp-story-player manually
    useEffect(() => {
        if (storyUrl && playerRef.current) {
            playerRef.current.innerHTML = ''; // Clear previous content

            const player = document.createElement('amp-story-player');
            player.style.width = '270px';
            player.style.height = '480px';
            player.style.borderRadius = '16px';
            player.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
            player.style.overflow = 'hidden';

            const a = document.createElement('a');
            a.href = storyUrl;
            a.textContent = 'Your AMP Story';
            player.appendChild(a);

            playerRef.current.appendChild(player);
        }
    }, [storyUrl]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                {isLoading && <div className="chat-message">Loading...</div>}
                {error && <div className="chat-message error">{error}</div>}
            </div>

            <div className="preview-wrapper" ref={playerRef}></div>

            <div className="chat-input">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a keyword and press Enter..."
                />
                <button onClick={handleClick}>Enter</button>
            </div>
        </div>
    );
};

export default StorySlideChat;

