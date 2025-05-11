import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/stories/by-writer`, {
        params: { writername: input },
      });
      setStories(res.data);
    } catch (error) {
      console.error('Axios error:', error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (url) => {
    setPreviewUrl(url);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setPreviewUrl('');
  };

  return (
    <div className='tabs'>
      <div className='tab1'>
        <p className='dashboard'>Dashboard</p>
      </div>

      <div className='tab2'>
        <div className='navbar'>
            <button>Sign in</button>
        </div>
        <div className='chat'>
          {loading ? (
            <p>Loading...</p>
          ) : stories.length > 0 ? (
            <div className='card-container'>
              {stories.map((story) => (
                <div key={story.id} className='story-card'>
                  <img src={story.image} alt={story.storytitle} />
                  <div className='story-content'>
                    <h3>{story.storytitle}</h3>
                    <p>{story.metadescription}</p>
                    <button onClick={() => handlePreview(story.canurl)}>Preview</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Type an author's name to see stories!</p>
          )}
        </div>

        <div className='input-field'>
          <input
            type='text'
            placeholder='Search by writer name'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleClick}>Send</button>
        </div>
      </div>

      {isSidebarOpen && (
        <div className='sidebar'>
          <button className='close-btn' onClick={closeSidebar}>X</button>
          <iframe src={previewUrl} title='Story Preview' frameBorder='0' className='iframe-preview' />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
