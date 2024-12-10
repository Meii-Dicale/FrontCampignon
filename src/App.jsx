import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from '../Pages/HomePage'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Navbar from '../Composants/Navbar'
import Navbardroite from '../Composants/Navbardroite';


function App() {
  return (
    <>
      <BrowserRouter>
      
        <Navbar />
        <Navbardroite />
      
        <Routes>
          <Route path='/' element={<HomePage />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;