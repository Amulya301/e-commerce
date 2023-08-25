import { fireEvent, render as rtRender, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store/store";
import Cart from "../Cart/Cart";
import { addCart, getTotalCart } from "../../store/cart-slice";

const render = (component) => {
    return {
        ...rtRender(<Provider store={store}>{component}</Provider>),
        store,
      };
}


const cart = {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ],
};

describe('should render cart', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })
    test('should display start shopping when cart is empty', async () => {
        render(<Cart />);
        const emptyElement = screen.getByText(/start shopping/i);
        expect(emptyElement).toBeInTheDocument();
    })


    test('should display cart', async () => {
        
        store.dispatch(addCart(cart));
        store.dispatch(getTotalCart());
        render(<Cart />);
        const items = screen.queryAllByTestId("cartitems");
        expect(items.length).toEqual(1);

        const title = screen.getByText(/iPhone 9/i);
        expect(title).toBeInTheDocument();
    })

    test('Fire event add cart on clicking "+" button', async () => {

        render(<Cart />);
        const increasebtn = screen.queryByTestId("+");
        fireEvent.click(increasebtn);

        const quantity = screen.getByText('2');
        expect(quantity).toBeInTheDocument();


    })

    test('Fire event add cart on clicking "-" button', async () => {

        render(<Cart />);
        const decreasebtn = screen.queryByTestId("-");
        fireEvent.click(decreasebtn);

        const quantity = screen.getByText('1');
        expect(quantity).toBeInTheDocument();
        fireEvent.click(decreasebtn);
        expect(quantity).not.toBeInTheDocument();

    })

    test("Fire event remove cart on click remove button", async () => {
        store.dispatch(addCart(cart));
        store.dispatch(getTotalCart());
        render(<Cart />);

        const removebtn = screen.queryByTestId('removecartbtn');
        fireEvent.click(removebtn);

        const emptyElement = screen.getByText(/start shopping/i);
        expect(emptyElement).toBeInTheDocument();
    })

    test("Fire event remove cart on click clear button", async () => {
        store.dispatch(addCart(cart));
        store.dispatch(getTotalCart());

        render(<Cart />);

        const clearbtn = screen.queryByTestId('clearcart');
        fireEvent.click(clearbtn);

        const emptyElement = screen.getByText(/start shopping/i);
        expect(emptyElement).toBeInTheDocument();
    })

})