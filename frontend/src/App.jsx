import { useState } from 'react'
import Chat2 from './components/Chat2.jsx'
import Chat from './components/Chat.jsx'
import Dashboard1 from './components/Dashboard1.jsx'
import Story from './components/StortSlide.jsx'
import Storypage from './components/Storypage.jsx'
import Chat3 from './components/Chat3.jsx'
import Restaurant from './components/Restaurant.jsx'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App



// classic flaviours

// "https://plus.unsplash.com/premium_photo-1723867522131-af9733323bc1?q=80&w=2009&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// "https://plus.unsplash.com/premium_photo-1663839412128-75e1539a1e81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// "https://images.unsplash.com/photo-1592382419341-a1ef0ddd7c8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// "https://images.unsplash.com/photo-1592663533909-f75fe1ae99a4?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// "https://plus.unsplash.com/premium_photo-1714115034755-341ed2d3cdab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


// Croissants
// https://www.foodrepublic.com/img/gallery/definitive-classic-butter-croissant-recipe/l-intro-1684859945.jpg
// https://images.unsplash.com/photo-1589007797526-ed40d157365d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://images.unsplash.com/photo-1625425404751-19b16c027511?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
// https://berryworld.imgix.net/assets/quick-blueberry-and-lemon-croissants-main-Large.jpg?auto=format&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=1500&ixlib=php-3.1.0&q=60&v=1570030231&w=2300
// https://cravingsjournal.com/wp-content/uploads/2024/04/croissant-tiramisu-1.jpg


// Gateaux

// https://www.justbake.in/userfiles/belgium-truffle.jpg
// https://upload.wikimedia.org/wikipedia/commons/b/b2/Red_Velvet_Cake_Waldorf_Astoria.jpg
// https://vjcooks.com/wp-content/uploads/2025/03/VJcooks_NutellaGateau_2.jpg
// https://zedthebaker.com/cdn/shop/files/Fresh_Fruit_Gateau_1.webp?v=1730279823
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReNSTctB0KmhiU33_pZn5kZww29CeCPeu93Q&s
// 

