import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Correctly renamed 'cart' to 'cartItems' for clarity
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total cost based on quantity for a single item
  const calculateTotalCost = (item) => {
    // Assumes item.cost is already a number
    return item.quantity * item.cost;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += calculateTotalCost(item);
    });
    // .toFixed(2) ensures the result is a string with two decimal places
    return total.toFixed(2);
  };

  // Handler for returning to the product list
  const handleContinueShopping = (e) => {
    // Calls the function passed down from the parent component (ProductList.jsx)
    onContinueShopping(e);
  };

  // Handler for the checkout button
  const handleCheckout = () => {
    alert('Functionality to be added for future reference');
  };

  // Handler for increasing item quantity
  const handleIncrement = (item) => {
    // Dispatches the updateQuantity action with the new quantity
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handler for decreasing item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is more than 1, just decrease it
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, dispatch the removeItem action to remove it from the cart
      dispatch(removeItem(item.name));
    }
  };

  // Handler for deleting an item from the cart
  const handleRemove = (item) => {
    // Dispatches the removeItem action
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                {/* Displaying unit cost */}
                <div className="cart-item-cost">${item.cost.toFixed(2)}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                {/* Displaying subtotal for the item */}
                <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Display the grand total only if the cart is not empty */}
      {cartItems.length > 0 && (
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
          <h3>Total Amount: ${calculateTotalAmount()}</h3>
        </div>
      )}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
