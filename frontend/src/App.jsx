import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus";
import About from "./pages/About";
import Chatbot from "./pages/Chatbot";

function AppLayout() {
  const { pathname } = useLocation();
  const isChatbot = pathname === '/chatbot';

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/about" element={<About />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      {!isChatbot && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}