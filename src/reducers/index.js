import { combineReducers } from 'redux';
import { SET_BANNERS, SET_CART, SET_CART_STATUS, SET_CATEGORIES, SET_PRODUCTS, SET_SELECTED_CATEGORY, SET_LOGIN_STATUS, SET_REGISTER_STATUS, SET_LOGOUT_STATUS } from '../actions/types';

const initialState = {
    categories: [],
    banners: [],
    products: [],
    cart: {},
    registerStatus: '',
    loginStatus: '',
    cartStatus: '',
    selectedCategory: {}
}

function setData(state = initialState, action) {
    switch (action.type) {
        case SET_BANNERS:
            return { ...state, banners: action.payload }
        case SET_CATEGORIES:
            return { ...state, categories: action.payload }
        case SET_PRODUCTS:
            return { ...state, products: action.payload }
        case SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload }
        case SET_CART:
            return state
        case SET_CART_STATUS:
            return { ...state, cartStatus: action.payload.response, cart: action.payload.data }
        case SET_REGISTER_STATUS: return Object.assign({}, state, {
            registerStatus: action.payload
        });
        case SET_LOGIN_STATUS: return Object.assign({}, state, {
            loginStatus: action.payload
        });
        case SET_LOGOUT_STATUS:
            return {...state, loginStatus: '', registerStatus: ''}
        default:
            return state
    }
}

export default combineReducers({ setData });