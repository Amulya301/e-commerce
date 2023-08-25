import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../store/products-slice";
import "./Home.css";
import { addCart } from "../../store/cart-slice";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

   const cartHandler = (product, e) => {
    e.preventDefault();
    dispatch(addCart(product));
  }


  return (
    <>
      <div className="container">
        
      {status === "success" ? (
        <>
          <h2 data-testid="availableproducts">Available Products</h2>
          <div className="products">
            {items.products.map((item) => (
              <div key={item.id} className="item"  data-testid="card-items">
                <img className="item-img" src={item.thumbnail} alt={item.title} />
                <div className="details">
                <h3>{item.title}</h3>
                  <span className="price">${item.price}</span>
                </div>
                <button className="btn btn-primary item-btn" data-testid="cartbtn" onClick={(e) => cartHandler(item,e)}>Add To Cart</button>
              </div>
            ))}
          </div>
        </>
        ) : status === "pending" ? (
            <p>Loading...</p>
        ):  (
          <p>Error occured while loading data...</p>
        )
    
      }
      </div>
      </>
  );
};

export default Home;
