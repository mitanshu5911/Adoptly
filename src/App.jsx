import React from 'react'
import Header from './common/Header'
import Signup from './components/Signup'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App