import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Cart.css";
import { addCart, clearCart, decreaseCart, getTotalCart, removeCart } from "../../store/cart-slice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.carts);
  const totalAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();


  const onAddHandler = (product, e) => {
    e.preventDefault();
    dispatch(addCart(product));
  };

  const clearCartHandler = (e) => {
    e.preventDefault();
    dispatch(clearCart());
  };

  const removeCartHandler = (product, e) => {
    e.preventDefault();
    dispatch(removeCart(product));
  };

  const decreaseHandler = (product,e) => {
    e.preventDefault();
    dispatch(decreaseCart(product));
  }

  useEffect(() => {
    dispatch(getTotalCart());
  }, [dispatch,cartItems]);

  return (
    <div className="container">
      <h1 className="cart-header">My Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is Empty</p>
          <a href="/">Start Shopping</a>
        </div>
      ) : (
        <div>
          <div className="Headers">
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Total</h4>
          </div>
          <hr />
          {cartItems.map((item) => (
            <div key={item.id} className="cart" data-testid="cartitems">
              <div className="cart-item">
                <div className="cartDetails">
                  <img
                    className="cart-item-img"
                    src={item.images[0]}
                    alt={item.title}
                  />
                  <div>
                    <h3>{item.title}</h3>
                  </div>
                </div>
                <div className="itemPrice">${item.price}</div>
                <div className="quantity">
                  <button onClick={(e) => decreaseHandler(item,e)} data-testid="-">-</button>
                  <span data-testid="quantity">{item.cartQuantity}</span>
                  <button onClick={(e) => onAddHandler(item, e)} data-testid="+">+</button>
                </div>

                <div className="totalPrice">
                  ${item.price * item.cartQuantity}
                </div>

                <div className="remove">
                  <button onClick={(e) => removeCartHandler(item, e)} data-testid="removecartbtn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
            <h3 className="totalAmount">Total: ${totalAmount}</h3>
            <button onClick={(e) => clearCartHandler(e)} className="btn btn-warning" data-testid="clearcart">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
