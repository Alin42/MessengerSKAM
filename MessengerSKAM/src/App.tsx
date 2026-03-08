import React from "react"
import Header from "./components/Header/header";
import Main from "./components/Main/main";
import Footer from "./components/Footer/footer";

const App: React.FC = () => {
   return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App