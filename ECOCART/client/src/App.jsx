import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home';       // no .jsx extension needed
import Login from './pages/login';
import Register from './pages/register';
import ProductForm from './pages/sellerForm';
import { ProductPage } from './pages/ProductPage2';
import Dashboard from './pages/dashboard';
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';
// import {EcoMartProductPage} from './pages/ProductPage2';

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
    <CartProvider>
    <Navbar setSearchTerm={setSearchTerm}/>
    <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm = {setSearchTerm}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/productForm' element={<ProductForm/>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path='/cart' element={<CartPage/>} />
        {/* <Route path='/mehul' element={<EcoMartProductPage/>}/> */}
        {/* <Route path="/sellerForm" element= {<sellerForm/>} /> */}
      </Routes>
      </CartProvider>
    </>
  );
}

export default App;
