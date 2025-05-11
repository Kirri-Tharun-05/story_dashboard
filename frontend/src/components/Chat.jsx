// // StorySlideChat.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import Mustache from 'mustache';

// const StorySlideChat = () => {
//   const [keyword, setKeyword] = useState('');
//   const [slides, setSlides] = useState([]);
//   const [preview, setPreview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setKeyword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     if (e.key === 'Enter' && keyword.trim() !== '') {
//       setIsLoading(true);
//       setError('');
//       setSlides([]);
//       setPreview('');

//       try {
//         const response = await axios.get(`http://localhost:5000/api/template/${keyword}`);
//         const data = response.data;
//         console.log(data);

//         if (data && data.slides && Array.isArray(data.slides)) {
//           setSlides(data.slides);
//         } else {
//           setError('Invalid template structure received.');
//         }
//       } catch (err) {
//         console.error(err);
//         // setError("Couldn't fetch template for that keyword.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handlePreview = () => {
//     const template = `
//       {{#slides}}
//         <div class="preview-slide">
//           <h2>{{heading}}</h2>
//           <p>{{content}}</p>
//         </div>
//       {{/slides}}
//     `;
//     const renderedHtml = Mustache.render(template, { slides });
//     setPreview(renderedHtml);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-box">
//         {isLoading && <div className="chat-message">Loading...</div>}
//         {error && <div className="chat-message error">{error}</div>}
//         {slides.map((slide, index) => (
//           <div key={index} className="chat-message">
//             <strong>{slide.heading}</strong>
//             <p>{slide.content}</p>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           type="text"
//           value={keyword}
//           onChange={handleChange}
//           onKeyDown={handleSubmit}
//           placeholder="Type a keyword and press Enter..."
//         />
//         {slides.length > 0 && (
//           <button onClick={handlePreview} style={{ marginLeft: '10px' }}>
//             Preview
//           </button>
//         )}
//       </div>

//       {preview && (
//         <div className="preview-area" dangerouslySetInnerHTML={{ __html: preview }} />
//       )}
//     </div>
//   );
// };

// export default StorySlideChat;


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

            try {
                const response = await axios.get(`http://localhost:5000/api/template/${keyword}`);
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

            <div className="chat-input">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    placeholder="Type a keyword and press Enter..."
                />
            </div>

            {/* AMP HTML Preview */}
            {preview && (
                // <div className="preview-area" dangerouslySetInnerHTML={{ __html: preview }} />
                // <iframe
                //     title="AMP Story Preview"
                //     srcDoc={preview}
                //     sandbox="allow-scripts allow-same-origin"
                //     width="360"
                //     height="600"
                //     style={{ border: "1px solid #ccc", borderRadius: "8px", marginTop: '20px' }}
                // ></iframe>
                <div className="preview-wrapper">
                    <iframe
                        title="AMP Story Preview"
                        srcDoc={preview}
                        sandbox="allow-scripts allow-same-origin"
                        width="360"
                        height="640"
                        style={{
                            border: "none",
                            borderRadius: "16px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                            marginTop: "20px",
                            width: "360px",
                            height: "640px",
                        }}
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default StorySlideChat;
