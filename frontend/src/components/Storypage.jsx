import React from 'react';

const StoryViewer = () => {

    return (
        <>
            <div className='tab' style={{
                border: '2px solid #ccc',
                borderRadius: '16px',
                overflow: 'hidden',
                width: '360px',
                height: '640px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                margin: 'auto',
            }}>

                <div style={{ width: '100%', height: '100vh' }}>
                    <iframe
                        src="http://localhost:5000/stories/how%20ai%20is%20changing%20the%20world.html"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        allow="fullscreen"
                        sandbox="allow-scripts allow-same-origin allow-popups"
                        title="AMP Story"
                    ></iframe>
                </div>
                <div>
                    <button>Hellp</button>
                </div>
            </div>
        </>
    );
};

export default StoryViewer;
