import { useState } from 'react'
import Chat2 from './components/Chat2.jsx'
import Chat from './components/Chat.jsx'
import Dashboard1 from './components/Dashboard1.jsx'
import Story from './components/StortSlide.jsx'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './App.css'
import './storyGenerator.css'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard1 />} />
          {/* <Route path='/dashboard' element={<Dashboard1 />} /> */}
          <Route path='/generateStory' element={<Chat />} />
          <Route path='/generateStory1' element={<Story />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
