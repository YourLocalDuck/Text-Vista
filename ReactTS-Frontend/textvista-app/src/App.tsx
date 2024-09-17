import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TextGallery } from './components/TextGallery'

const App:React.FC = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/text" element={<TextGallery />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
