import { useEffect, useRef } from 'react';

function StoryPreview({ keyword }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      // Clear old story links
      playerRef.current.innerHTML = '';

      const anchor = document.createElement('a');
      anchor.href = `http://localhost:5000/stories/${keyword}.html`; // Make sure this URL serves AMP story
      anchor.textContent = 'Your AMP Story';
      playerRef.current.appendChild(anchor);

      // Re-initialize player
      const script = document.createElement('script');
      script.src = 'https://cdn.ampproject.org/amp-story-player-v0.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [keyword]);

  return (
    <amp-story-player style={{ width: 360, height: 600 }} ref={playerRef}>
      {/* Story will be inserted dynamically */}
    </amp-story-player>
  );
}
