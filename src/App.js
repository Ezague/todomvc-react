import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Todomvc from './Todomvc';

export default function App() {
  return (
    <Router>
      <Todomvc />
    </Router>
  );
}