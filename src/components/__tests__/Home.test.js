import { fireEvent, render as rtRender, screen, waitFor } from "@testing-library/react";
import Home from "../Home/Home";
import { Provider } from "react-redux";
import store from "../../store/store";
import { fetchProducts } from "../../store/products-slice";

const render = (component) => rtRender( <Provider store={store}>{component}</Provider>);

describe("render Home component correctly", () => {
    afterEach(() => jest.clearAllMocks());
    

    test('should render data correctly', async () => {
        store.dispatch(fetchProducts.fulfilled);
        
        render(<Home />);
        const mockdata = await screen.findAllByTestId("card-items");
        
        expect(mockdata.length).toEqual(30);


    })

    test('should fire click event on Add to Cart button correctly', async () => {
        await store.dispatch(fetchProducts.fulfilled);
        render(<Home />);
        await waitFor(() => {
            const btns = screen.getAllByTestId('cartbtn');
        expect(btns[0]).toBeInTheDocument();
        })
        const btns = screen.getAllByTestId('cartbtn');
        fireEvent.click(btns[0]);

        expect(store.getState().cart.carts.length).toEqual(1);

    })

   

    test("should display error if failed", async () => {
        store.dispatch({ type: "products/fetchProducts/rejected" });
    render(<Home />);
    const text = screen.queryByRole('paragraph', {name:/Error occured while loading data.../i});
    expect(text).not.toBeInTheDocument();
    });
    
});
