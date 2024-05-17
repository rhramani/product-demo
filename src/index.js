import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import ProductDetails from './features/products/ProductDetails';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './features/products/login/Login';
import Dashboard from './features/products/login/Dashboard';
import CartProduct from './features/products/CartProduct';

const container = document.getElementById('root');
const root = createRoot(container);

const token = localStorage.getItem("token")
root.render(

  < Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path="/cartProduct/:cartId" element={<CartProduct />} />
        <Route path='/login' element={<Login />} />
        <Route path="/user/dashboard" element={token ? <Dashboard /> : <Navigate to={"/"} />} />


        <Route path='*' element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  </Provider >
);


reportWebVitals();
