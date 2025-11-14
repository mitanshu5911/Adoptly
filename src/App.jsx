import React from 'react'
import Header from './common/Header'
import Signup from './components/Signup'
import { Route, Router, Routes } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PostPet from './components/PostPet'
import AdoptPet from './components/Adoptpet/AdoptPet'
import YourPet from './components/yourPet/YourPet'
import Request from './components/yourPet/Request.JSX'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path= '/postpet' element={<PostPet/>}/>
        <Route path='/adoptpet' element={<AdoptPet/>}/>
        <Route path='/yourPet' element={<YourPet/>}/>
        <Route path='/requests' element = {<Request/>}/>
      </Routes>
    </div>
  )
}

export default App