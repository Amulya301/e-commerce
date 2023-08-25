import cartReducer, { removeCart } from "../cart-slice";
import { configureStore } from "@reduxjs/toolkit";
import "jest-localstorage-mock";
import { addCart } from "../cart-slice";

let store;

const carts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
  },
];

const localStorageMock = (() => {

  return {
    getItem: jest.fn(key => store[key]),
    setItem: jest.fn((key, value) => { store[key] = value; }),
    removeItem: jest.fn(key => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe("should fetch Response", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({ reducer: { cart: cartReducer } });
  });

  afterEach(() => { localStorage.clear() });

  test("fetch initial state with items of localstorage", () => {
    store.dispatch(addCart(carts));
    const state = store.getState();

    expect(state.cart.carts).toHaveLength(1);
    expect(state.cart.carts[0].cartQuantity).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "carts",
      JSON.stringify(state.cart.carts)
    );
  });

  test("fetch initial state with empty localstorage", () => {
    localStorage.clear();

    const initialState = {
      carts: [],
      cartTotalAmount: 0,
    };

    const state = cartReducer(undefined, {});
    expect(state).toEqual(initialState);
  });
  test("should update localStorage when state of cart changes", () => {
    store.dispatch(addCart(carts));
    store.dispatch(removeCart({ id: 1 }));

    const state = store.getState().cart;
    expect(state.carts).toHaveLength(0);
  });
});
