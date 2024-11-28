import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewAppointment from './components/ViewAppointment';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <Routes>
          <Route path="/" element={<Home />} /> {/* Home Route */}
          <Route path="/about" element={<Home />} /> {/* About Route */}
          <Route path="/contact" element={<Home />} /> {/* Contact Route */}
          <Route path="/appointments/view/:id" element={<ViewAppointment />} /> {/* View Appointment Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);