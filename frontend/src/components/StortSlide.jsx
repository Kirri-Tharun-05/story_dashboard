import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const StorySlideChat = () => {
    const [keyword, setKeyword] = useState('');
    const [storyUrl, setStoryUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const playerRef = useRef(null);

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        if (e.key === 'Enter' && keyword.trim() !== '') {
            setIsLoading(true);
            setError('');
            setStoryUrl('');
            try {
                // API generates the story and saves it as HTML file (e.g., /stories/ai.html)
                const response = await axios.get(`http://localhost:5000/api/generateStory/${keyword}`);
                if (response.status === 200) {
                    const storyFile = `${keyword}.html`;
                    setStoryUrl(`http://localhost:5000/stories/${storyFile}`);
                } else {
                    setError('Failed to generate story.');
                }
            } catch (err) {
                console.error(err);
                setError("Couldn't fetch story for that keyword.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Re-render the amp-story-player content
    useEffect(() => {
        if (storyUrl && playerRef.current) {
            playerRef.current.innerHTML = ''; // clear existing story

            const anchor = document.createElement('a');
            anchor.href = storyUrl;
            anchor.textContent = 'Your AMP Story';
            playerRef.current.appendChild(anchor);
        }
    }, [storyUrl]);

    // Load amp-story-player script once
    useEffect(() => {
        const existing = document.querySelector('script[src*="amp-story-player"]');
        if (!existing) {
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

    return (
        <div className="chat-container">
            <div className="chat-box">
                {isLoading && <div className="chat-message">Loading...</div>}
                {error && <div className="chat-message error">{error}</div>}
            </div>

            {/* AMP Story Preview */}
            {storyUrl && (
                <div className="preview-wrapper">
                    <amp-story-player
                        style={{
                            width: '270px',
                            height: '480px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                            overflow: 'hidden',
                        }}
                        ref={playerRef}
                    >
                        {/* AMP story link will be injected here */}
                    </amp-story-player>
                </div>
            )}

            <div className="chat-input">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    placeholder="Type a keyword and press Enter..."
                />
                <button disabled>Enter</button>
            </div>
        </div>
    );
};

export default StorySlideChat;
