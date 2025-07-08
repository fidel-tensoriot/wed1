import { Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Nav/Navbar";
import Footer from "./components/Footer/Footer";
import Home from './pages/Home'
import Gallery from "./pages/Gallery"
import PhotoBooth from "./pages/PhotoBooth";
import Secret from "./pages/Secret";


function App() {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/photobooth" element={<PhotoBooth />} />
                <Route path="/secret" element={<Secret />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
