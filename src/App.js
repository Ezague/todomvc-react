import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todomvc from './Todomvc';
import Login from './Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todomvc />} />
        <Route path="/active" element={<Todomvc />} />
        <Route path="/completed" element={<Todomvc />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}