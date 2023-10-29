import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { cartReducer } from './reducers/CartReducer';
import { getProductsReducer, getProductDetailsReducer } from './reducers/ProductReducer';

const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
})


const middleware = [thunk];

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;