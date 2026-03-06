import { createRoot } from 'react-dom/client'
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Post from './components/post/App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/post/" element={<Post />} />
    </Routes>
  </BrowserRouter>,
)