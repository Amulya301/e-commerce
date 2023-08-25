import { render as rtRender } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store/store";

const render = (component) => rtRender(<Provider store={store}>{ component}</Provider>)

test('renders learn react link', () => {

  render(<App />);
});

