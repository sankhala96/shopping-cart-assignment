import axios from "axios";
import * as Constants from '../global-constants';
import {
    SET_CATEGORIES, SET_BANNERS, SET_PRODUCTS, SET_CART,
    SET_LOGIN_STATUS, SET_CART_STATUS, SET_REGISTER_STATUS, SET_SELECTED_CATEGORY, SET_LOGOUT_STATUS
} from './types';

export const setBanners = (banner) => {
    if(banner && banner.length > 0) {
        banner.sort((banner1, banner2) => banner1.order - banner2.order);
    }
    return { type: SET_BANNERS, payload: banner };
}

export const setCategories = (cate) => {
    if(cate && cate.length > 0) {
        cate = cate.filter((category) => category.enabled)
        cate.sort((cate1, cate2) => cate1.order - cate2.order);
    }
    return { type: SET_CATEGORIES, payload: cate };
}

export const setProducts = (products) => {
    return { type: SET_PRODUCTS, payload: products };
}

export const setSelectedCategory = (selectedCategory) => {
    return { type: SET_SELECTED_CATEGORY, payload: selectedCategory }
}

export const setCart = () => {
    return { type: SET_CART }
}

export const setCartStatus = (res, data) => {
    res.data = data
    return { type: SET_CART_STATUS, payload: res }
}

export function setLoginStatus(prod) {
    return { type: SET_LOGIN_STATUS, payload: prod };
}

export function setRegisterStatus(prod) {
    return { type: SET_REGISTER_STATUS, payload: prod };
}

export function setLogout() {
    return { type: SET_LOGOUT_STATUS }
}

const config = {
    headers: {
        'Accept': 'application/json'
    }
}

export const fetchData = (url) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(Constants.UrlServer + url, config);
            switch (url) {
                case Constants.UrlBannersApi: dispatch(setBanners(response.data)); break;
                case Constants.UrlCategoriesApi: dispatch(setCategories(response.data)); break;
                case Constants.UrlProductsApi: dispatch(setProducts(response.data)); break;
                case Constants.UrlCartApi: dispatch(setCart(response.data)); break;
                default: break;
            }
        }
        catch (error) {
            throw (error)
        }
    }
}

export const postData = (url, data) => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    return async (dispatch) => {
        try{
            const response = await axios.post(Constants.UrlServer + url, data, config);
            switch (url) {
                case Constants.UrlCartApi: dispatch(setCartStatus(response, data)); break;
                case Constants.UrlRegisterApi: dispatch(setRegisterStatus(response.status)); break;
                case Constants.UrlLoginApi: dispatch(setLoginStatus(response.status)); break;
                default: break;
            }
        }
        catch (error) {
            throw (error)
        }
    }
}

export const saveData = (key, value) => {
    return async (dispatch) => {
        try {
            switch(key) {
                case Constants.UrlSelectedCategory: dispatch(setSelectedCategory(value)); break;
                case Constants.UrlLogout: dispatch(setLogout()); break;
                default: break;
            }
        }
        catch (error) {
            throw (error)
        }
    }
}