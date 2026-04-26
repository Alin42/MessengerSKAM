import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cookies } from "react-cookie";

import ElementsTest from "./pages/Another/Test";
import AuthPage from "./pages/Auth/Auth";
import UserPage from "./pages/User/User";
import NotFound from "./pages/Another/NotFound";
import About from "./pages/Another/About";

const cookies = new Cookies();

function applyTheme() {
  const theme = cookies.get("theme") || "classic";

  cookies.set("theme", theme, { path: "/", sameSite: "strict" });
  document.documentElement.setAttribute("data-theme", theme);
}

const App: React.FC = () => {
  useEffect(() => {
    applyTheme();
  }, []);

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
  );
};

export default App;