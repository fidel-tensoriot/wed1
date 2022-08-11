import Navbar from "./components/Nav/Navbar";
import Home from './pages/Home'
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <div className="flex flex-col min-h-screen"> {/* justify-between min-h-screen */}
            <Navbar/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;
