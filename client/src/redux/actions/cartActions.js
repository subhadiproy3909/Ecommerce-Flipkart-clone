import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

const url = "http://localhost:5000";

export const addToCart = (id, quantity) => async (dispatch) => {
    try { 
        const { data } = await axios.get(`${url}/product/productdetails/${id}`);

        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity } });
        
    } catch (error) {
        dispatch({ type: actionTypes.ADD_TO_CART_ERROR, payload: error.message });
    }
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    });
}