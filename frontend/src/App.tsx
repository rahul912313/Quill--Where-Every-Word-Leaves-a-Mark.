import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Blog from './pages/Blog'
import Landing from './pages/Landing'
import './index.css';


import './App.css'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/blog/:id' element={<Blog/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
