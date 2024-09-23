import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { TextGallery } from './components/TextGallery'
import { HomePage } from './components/Home/Login/HomePage';

const App:React.FC = () => {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage/>}/>
          <Route path="/text" element={<TextGallery />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
