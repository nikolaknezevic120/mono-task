import React from 'react'
import ReactDOM from 'react-dom';
import MainApp from './components/Main/App/MainApp'
import Order from './components/Order/Order'
import Header from './components/Main/App/Header'
import Footer from './components/Main/App/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path='/order' element={<Order />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}