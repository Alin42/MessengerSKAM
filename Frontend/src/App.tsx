import React from "react"
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import ElementsTest from "./pages/Test";
import AuthPage from "./pages/Auth";
import UserPage from "./pages/User";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

const App: React.FC = () => {
   return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth/*" element={<AuthPage />} />
      <Route path="/home/*" element={<UserPage />} />
      <Route path="/test" element={<ElementsTest />} />
      <Route path="/about" element={<About />} />
		  <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App