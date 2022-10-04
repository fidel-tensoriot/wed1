import Navbar from "./components/Nav/Navbar";
import Home from './pages/Home'
import Gallery from "./pages/Gallery"
import Footer from "./components/Footer/Footer";
import { Routes, Route, Link } from "react-router-dom";


function App() {
    return (
        <div className="flex flex-col min-h-screen justify-between"> {/*  min-h-screen */}
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/gallery" element={<Gallery/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
