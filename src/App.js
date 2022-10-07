import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todomvc from './Todomvc';
import Login from './Login';
import Signup from './Signup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Todomvc />} />
        <Route path="/active" element={<Todomvc />} />
        <Route path="/completed" element={<Todomvc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}