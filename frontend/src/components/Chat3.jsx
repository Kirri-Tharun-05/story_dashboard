// import React, { useState } from 'react';
// import axios from 'axios';
// import '../chat3.css'

// const StorySlideChat = () => {
//   const [keyword, setKeyword] = useState('');
//   const [preview, setPreview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setKeyword(e.target.value);
//   };

//   const handleSubmit = async (e,isButtonClicked=false) => {
//     console.log("Clicked");
//     if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
//       setIsLoading(true);
//       setError('');
//       setPreview('');

//       try {
//         const response = await axios.get(`http://localhost:5000/api/generateStory/${keyword}`);
//         if (response.data) {
//           setPreview(response.data); // Expecting AMP HTML string
//         } else {
//           setError('Received empty preview content.');
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Couldn't fetch story for that keyword.");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="story-container">
//       <h1>Story Generator</h1>

//       <div className="input-section">
//         <input
//           type="text"
//           value={keyword}
//           onChange={handleChange}
//           onKeyDown={handleSubmit}
//           placeholder="Type a keyword and press Enter..."
//         />
//         <button onClick={(e) => handleSubmit(e, true)}>Create</button>
//       </div>

//       {isLoading && <p className="status loading">Loading...</p>}
//       {error && <p className="status error">{error}</p>}

//       {preview && (
//         <div className="preview-wrapper">
//           <iframe
//             title="AMP Story Preview"
//             srcDoc={preview}
//             sandbox="allow-scripts allow-same-origin"
//             width="300"
//             height="550"
//             style={{
//               border: "none",
//               borderRadius: "16px",
//               boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
//             }}
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StorySlideChat;
import React, { useState } from 'react';
import axios from 'axios';
import '../chat3.css'; // Make sure CSS below is in this file

const StorySlideChat = () => {
  const [keyword, setKeyword] = useState('');
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e, isButtonClicked = false) => {
    if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
      setIsLoading(true);
      setError('');
      setPreview('');

      try {
        const encodedKeyword = encodeURIComponent(keyword);
        // axios.get(`/api/generateStory/${encodedKeyword}`);

        const response = await axios.get(`https://story-dashboard-backend.onrender.com/api/generateStory/${encodedKeyword}`);
        if (response.data) {
          // Delay preview update slightly for smoother transition
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
    }
  };

  return (
    <div className="story-container">
      <h1>Story Generator</h1>

      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="text"
            value={keyword}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            placeholder="Type a restaurant..."
          />
          <button onClick={(e) => handleSubmit(e, true)}>Create</button>
        </div>
      </div>


      {isLoading && <p className="status loading">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      <div className={`preview-wrapper ${preview ? 'show' : ''}`}>
        {preview && (
          <iframe
            title="AMP Story Preview"
            srcDoc={preview}
            sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            width="300"
            height="550"
            style={{
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default StorySlideChat;


// restaurants names
// Blackout Club & Terrace
// Purgatory 777


// dish names
// pizzas
// Croissants