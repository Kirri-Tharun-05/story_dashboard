import React, { useState } from 'react'
const Dashboard = () => {
  const [input,setInput]=useState('');
  const [response,setResponse]=useState('');
  const handelClick=()=>{
     
  }
  return (
    <>
      <div className='tabs'>
        <div className='tab1'>
          <p className='dashboard'>Dashboard</p>
        </div>
        <div className='tab2'>
          <div className='chat'>Hello type something!</div>
          <div className='input-field'>
            <input type="text" placeholder='Search'/>
            <button onClick={handelClick}>Send</button>
          </div>
        </div>
        <div style={{ color: 'black' }}></div>
      </div>
    </>
  )
}
export default Dashboard;
