// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../chat3.css';

// const Restaurant = () => {
//   const [categories, setCategories] = useState([]);       // categories from DB
//   const [currentIndex, setCurrentIndex] = useState(0);    // current index for cycling
//   const [keyword, setKeyword] = useState('');             // current category keyword
//   const [preview, setPreview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/fetchCategories/category');
//         console.log(res);
//         setCategories(res.data);
//         if (res.data.length > 0) {
//           setKeyword(res.data[0]);  // set initial keyword to first category
//           fetchStory(res.data[0]);
//         }
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setError('Failed to load categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch story preview by keyword
//   const fetchStory = async (kw) => {
//     setIsLoading(true);
//     setError('');
//     setPreview('');

//     try {
//       const response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/${encodeURIComponent(kw)}`);
//       if (response.data) {
//         setTimeout(() => {
//           setPreview(response.data);
//         }, 100);
//       } else {
//         setError('Received empty preview content.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Couldn't fetch story for that keyword.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handler for manual input change (optional)
//   const handleChange = (e) => {
//     setKeyword(e.target.value);
//   };

//   // Handler for submit button or enter key
//   const handleSubmit = (e, isButtonClicked = false) => {
//     if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
//       fetchStory(keyword);
//     }
//   };

//   // Handler for Next button: cycle categories and fetch story
//   // const handleNext = () => {
//   //   if (categories.length === 0) return;

//   //   const nextIndex = (currentIndex + 1) % categories.length;
//   //   setCurrentIndex(nextIndex);
//   //   const nextKeyword = categories[nextIndex];
//   //   setKeyword(nextKeyword);
//   //   fetchStory(nextKeyword);
//   // };
// const handleNext = () => {
//   if (categories.length === 0) return;

//   const nextIndex = (currentIndex + 1) % categories.length;
//   setCurrentIndex(nextIndex);

//   const nextKeyword = categories[nextIndex];
//   setKeyword(nextKeyword);
//   fetchStory(nextKeyword);
// };

// // Handler for Previous button: cycle categories backward and fetch story
// const handlePrevious = () => {
//   if (categories.length === 0) return;

//   // Use (currentIndex - 1 + categories.length) % categories.length for circular back cycling
//   const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
//   setCurrentIndex(prevIndex);

//   const prevKeyword = categories[prevIndex];
//   setKeyword(prevKeyword);
//   fetchStory(prevKeyword);
// };
//   return (
//     <div className="story-container">
//       <h1>Dish Story Generator</h1>

//       <div className="input-section">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             value={keyword}
//             onChange={handleChange}
//             onKeyDown={handleSubmit}
//             placeholder="Type a restaurant or select a category"
//           />
//           <button onClick={(e) => handleSubmit(e, true)}>Create</button>
//           {/* <button onClick={handleNext}>Next</button> */}
//         </div>
//       </div>

//       {isLoading && <p className="status loading">Loading...</p>}
//       {error && <p className="status error">{error}</p>}

//       <div className="preview-container">
//               <button className="left" onClick={handlePrevious}>
//                 &#10094;
//               </button>

//         <div className={`preview-wrapper ${preview ? 'show' : ''}`}>
//           {preview && (
//             <iframe
//               title="AMP Story Preview"
//               srcDoc={preview}
//               sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
//               width="300"
//               height="550"
//               style={{
//                 border: 'none',
//                 borderRadius: '16px',
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//               }}
//             ></iframe>
//           )}
//         </div>

//               <button className="right" onClick={handleNext}>
//                 &#10095;
//               </button>
//       </div>

//     </div>
//   );
// };

// export default Restaurant;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../chat3.css';

// const Restaurant = () => {
//   const [categories, setCategories] = useState([]);       // categories from DB
//   const [currentIndex, setCurrentIndex] = useState(-1);    // current index for cycling; -1 means none selected yet
//   const [keyword, setKeyword] = useState('');             // user input or category keyword
//   const [preview, setPreview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/fetchCategories/category');
//         setCategories(res.data);
//         // Do NOT fetch story here on mount
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setError('Failed to load categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch story preview by keyword
//   const fetchStory = async (kw) => {
//     setIsLoading(true);
//     setError('');
//     setPreview('');

//     try {
//       const response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/${encodeURIComponent(kw)}`);
//       if (response.data) {
//         setTimeout(() => {
//           setPreview(response.data);
//         }, 100);
//       } else {
//         setError('Received empty preview content.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Couldn't fetch story for that keyword.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handler for manual input change
//   const handleChange = (e) => {
//     setKeyword(e.target.value);
//     setCurrentIndex(-1); // reset currentIndex if user types manually
//   };

//   // Handler for submit button or enter key
//   const handleSubmit = (e, isButtonClicked = false) => {
//     if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
//       fetchStory(keyword);
//       setCurrentIndex(-1);  // reset currentIndex because user input overrides category cycling
//     }
//   };

//   // Handler for Next button: cycle categories and fetch story
//   const handleNext = () => {
//     if (categories.length === 0) return;

//     let nextIndex = currentIndex;
//     if (nextIndex === -1) {
//       nextIndex = 0;
//     } else {
//       nextIndex = (currentIndex + 1) % categories.length;
//     }
//     setCurrentIndex(nextIndex);

//     const nextKeyword = categories[nextIndex];
//     setKeyword(nextKeyword);
//     fetchStory(nextKeyword);
//   };

//   // Handler for Previous button: cycle categories backward and fetch story
//   const handlePrevious = () => {
//     if (categories.length === 0) return;

//     let prevIndex = currentIndex;
//     if (prevIndex === -1) {
//       prevIndex = categories.length - 1;
//     } else {
//       prevIndex = (currentIndex - 1 + categories.length) % categories.length;
//     }
//     setCurrentIndex(prevIndex);

//     const prevKeyword = categories[prevIndex];
//     setKeyword(prevKeyword);
//     fetchStory(prevKeyword);
//   };

//   return (
//     <div className="story-container">
//       <h1>Dish Story Generator</h1>

//       <div className="input-section">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             value={keyword}
//             onChange={handleChange}
//             onKeyDown={handleSubmit}
//             placeholder="Type a restaurant or select a category"
//           />
//           <button onClick={(e) => handleSubmit(e, true)}>Create</button>
//         </div>
//       </div>

//       {isLoading && <p className="status loading">Loading...</p>}
//       {error && <p className="status error">{error}</p>}

//       <div className="preview-container">
//         <button className="left" onClick={handlePrevious}>&#10094;</button>

//         <div className={`preview-wrapper ${preview ? 'show' : ''}`}>
//           {preview && (
//             <iframe
//               title="AMP Story Preview"
//               srcDoc={preview}
//               sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
//               width="300"
//               height="550"
//               style={{
//                 border: 'none',
//                 borderRadius: '16px',
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//               }}
//             ></iframe>
//           )}
//         </div>

//         <button className="right" onClick={handleNext}>&#10095;</button>
//       </div>
//     </div>
//   );
// };

// export default Restaurant;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../chat3.css';

// const Restaurant = () => {
//   const [categories, setCategories] = useState([]);       // categories from DB
//   const [currentIndex, setCurrentIndex] = useState(-1);    // current index for cycling; -1 means none selected yet
//   const [keyword, setKeyword] = useState('');             // user input or category keyword
//   const [preview, setPreview] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Fetch categories on component mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/fetchCategories/category');
//         setCategories(res.data);
//         // Do NOT fetch story here on mount
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setError('Failed to load categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch story preview by keyword
//   const fetchStory = async (kw) => {
//     setIsLoading(true);
//     setError('');
//     setPreview('');

//     try {
//       const response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/${encodeURIComponent(kw)}`);
//       if (response.data) {
//         setTimeout(() => {
//           setPreview(response.data);
//         }, 100);
//       } else {
//         setError('Received empty preview content.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Couldn't fetch story for that keyword.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handler for manual input change
//   const handleChange = (e) => {
//     setKeyword(e.target.value);
//     setCurrentIndex(-1); // reset currentIndex if user types manually
//   };

//   // Handler for submit button or enter key
//   const handleSubmit = (e, isButtonClicked = false) => {
//     if ((isButtonClicked || e.key === 'Enter') && keyword.trim() !== '') {
//       fetchStory(keyword);
//       setCurrentIndex(-1);  // reset currentIndex because user input overrides category cycling
//     }
//   };

//   // Handler for Next button: cycle categories and fetch story
//   const handleNext = () => {
//     if (categories.length === 0) return;

//     let nextIndex = currentIndex;
//     if (nextIndex === -1) {
//       nextIndex = 0;
//     } else {
//       nextIndex = (currentIndex + 1) % categories.length;
//     }
//     setCurrentIndex(nextIndex);

//     const nextKeyword = categories[nextIndex];
//     setKeyword(nextKeyword);
//     fetchStory(nextKeyword);
//   };

//   // Handler for Previous button: cycle categories backward and fetch story
//   const handlePrevious = () => {
//     if (categories.length === 0) return;

//     let prevIndex = currentIndex;
//     if (prevIndex === -1) {
//       prevIndex = categories.length - 1;
//     } else {
//       prevIndex = (currentIndex - 1 + categories.length) % categories.length;
//     }
//     setCurrentIndex(prevIndex);

//     const prevKeyword = categories[prevIndex];
//     setKeyword(prevKeyword);
//     fetchStory(prevKeyword);
//   };

//   return (
//     <div className="story-container">
//       <h1>Dish Story Generator</h1>

//       <div className="input-section">
//         <div className="input-wrapper">
//           <input
//             type="text"
//             value={keyword}
//             onChange={handleChange}
//             onKeyDown={handleSubmit}
//             placeholder="Type a restaurant or select a category"
//           />
//           <button onClick={(e) => handleSubmit(e, true)}>Create</button>
//         </div>
//       </div>

//       {isLoading && <p className="status loading">Loading...</p>}
//       {error && <p className="status error">{error}</p>}

//       <div className="preview-container">
//         {/* Show buttons only if preview is available */}
//         {preview && <button className="left" onClick={handlePrevious}>&#10094;</button>}

//         <div className={`preview-wrapper ${preview ? 'show' : ''}`}>
//           {preview && (
//             <iframe
//               title="AMP Story Preview"
//               srcDoc={preview}
//               sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
//               width="300"
//               height="550"
//               style={{
//                 border: 'none',
//                 borderRadius: '16px',
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
//               }}
//             ></iframe>
//           )}
//         </div>

//         {preview && <button className="right" onClick={handleNext}>&#10095;</button>}
//       </div>
//     </div>
//   );
// };

// export default Restaurant;

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

    try {
      const response = await axios.get(`https://story-dashboard-backend.onrender.com/api/restaurant/generateStory/${encodeURIComponent(kw)}`);
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
      fetchStory(keyword);
      setCurrentIndex(-1); // reset index because user input overrides category cycling
    }
  };

  // Cycle to next category and fetch story
  const handleNext = () => {
    if (categories.length === 0) return;

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
