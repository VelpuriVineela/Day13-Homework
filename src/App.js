// App.js

import React from 'react';
import CartComponent from './CartComponent';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Shopping Cart App</h1>
      <CartComponent />
    </div>
  );
};

export default App;
