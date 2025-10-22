import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SobreMi from "./pages/SobreMi";
import Blog from "./pages/Blog";
import Tienda from "./pages/Tienda";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-[var(--font-lekton)] text-gray-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<SobreMi />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
