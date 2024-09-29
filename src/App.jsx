import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CategoryListingPage from "./pages/CategoryListingPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductListingPage from "./pages/ProductListingPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";


function App() {
  return (
    <div className="bg-[#222222] min-h-screen">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/categories" element={<CategoryListingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category" element={<CategoryPage />} />        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
