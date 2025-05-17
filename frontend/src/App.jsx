import { useState } from 'react'
import Chat2 from './components/Chat2.jsx'
import Chat from './components/Chat.jsx'
import Dashboard1 from './components/Dashboard1.jsx'
import Chat3 from './components/Restaurant.jsx'
import Restaurant from './components/Restaurant.jsx'
import Restaurant1 from './components/Restaurant2.jsx'
import Test1 from './components/Test1.jsx';
import Test2 from './components/Test2.jsx';
import UrlBasedStories from './components/UrlBasedStories.jsx'
import UrlBasedAnimation from './components/UrlBasedAnimation.jsx'
import StoryPlayer from './components/ampStoryPlayer.jsx'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css'
import './storyGenerator.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard1 />} />
          {/* <Route path='/dashboard' element={<Dashboard1 />} />
          <Route path='/generateStory' element={<Chat />} />
          <Route path='/generateStory1' element={<Story />} />
          <Route path='/storypage' element={<Storypage />} /> */}
          <Route path='/restaurants' element={<Chat3 />} />
          <Route path='/dishes' element={< Restaurant/>} />
          <Route path='/dishes1' element={< Restaurant1/>} />
          <Route path='/test1' element={< Test1/>} />
          <Route path='/test2' element={< Test2/>} />
           {/* <Route path="/restaurant/:category?" element={<UrlBasedStories />} /> */}
           <Route path="/restaurant/:category?" element={<UrlBasedAnimation />} />
           <Route path="/ampStoryPlayer/restaurant/:category?" element={<StoryPlayer />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
