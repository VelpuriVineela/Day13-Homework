

import React, { useReducer } from 'react';

const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

  
const productReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const existingProduct = state.find((item) => item.id === action.payload.id);
  
        if (existingProduct) {
          const newState = state.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          return newState;
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }
  
      case 'REMOVE_FROM_CART':
        const existingProductIndex = state.findIndex(
          (item) => item.id === action.payload.id && item.quantity > 0
        );
  
        if (existingProductIndex !== -1) {
          const newState = [...state];
          newState[existingProductIndex].quantity -= 1;
  
          return newState;
        } else {
          return state;
        }
  
      default:
        return state;
    }
  };
  
  
  

const CartComponent = () => {
  const [cart, dispatchCart] = useReducer(productReducer, []);

  const addToCart = (product) => {
    dispatchCart({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatchCart({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const CartContent = () => {
    if (cart.length === 0) {
      return <p>No Product added to the cart</p>;
    }

    return (
      <div>
        <h2>Your Cart:</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
              <button onClick={() => removeFromCart(item)}>-</button>
            </li>
          ))}
        </ul>
        <p>Total Price: ${getTotalPrice()}</p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h2>Available Products:</h2>
        <ul>
          {Products.map((product) => (
            <li key={product.id}>
              {product.name} - Price: ${product.price}
              <button onClick={() => addToCart(product)}>
                +{cart.find((item) => item.id === product.id)?.quantity || 0}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CartContent />
      </div>
    </div>
  );
};

export default CartComponent;
