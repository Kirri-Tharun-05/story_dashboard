import React, { useState } from 'react';
import axios from 'axios';
import Mustache from 'mustache';

const StorySlideChat = () => {
    const [keyword, setKeyword] = useState('');
    const [slides, setSlides] = useState([]);
    const [preview, setPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        if (e.key === 'Enter' && keyword.trim() !== '') {
            setIsLoading(true);
            setError('');
            setSlides([]);
            setPreview('');
            console.log(keyword);
            try {
                const response = await axios.get(`http://localhost:5000/api/generateStory/${keyword}`);
                // console.log(response);
                const data = response.data;

                // Check if the response is correct
                if (data) {
                    setPreview(data);  // Set AMP HTML response as preview
                } else {
                    setError('Invalid template structure received.');
                }
            } catch (err) {
                console.error(err);
                setError("Couldn't fetch template for that keyword.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {isLoading && <div className="chat-message">Loading...</div>}
                {error && <div className="chat-message error">{error}</div>}
                {slides.map((slide, index) => (
                    <div key={index} className="chat-message">
                        <strong>{slide.heading}</strong>
                        <p>{slide.content}</p>
                    </div>
                ))}
            </div>


            {/* AMP HTML Preview */}
            {preview && (
                <div className="preview-wrapper">
                    <iframe
                        title="AMP Story Preview"
                        srcDoc={preview}
                        // src={`http://localhost:5000/api/generateStory/${keyword}`}
                        sandbox="allow-scripts allow-same-origin"
                        width="360"
                        height="640"
                        style={{
                            border: "none",
                            borderRadius: "16px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                            width: "270px",
                            height: "480px",
                        }}
                    ></iframe>
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
                <button>Enter</button>
            </div>
        </div>
    );
};

export default StorySlideChat;
