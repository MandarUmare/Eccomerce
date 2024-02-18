import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product:[],
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error:action.payload,
       
      };

    case CLEAR_ERRORS:
        return {
          ...state,
          error:null
        };

    default:
    return state;
    
  }
};


export const productReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error:action.payload,
        product:[]
      };

    case CLEAR_ERRORS:
        return {
          ...state,
          error:null
        };

    default:
    return state;
    
  }
};


export const searchproductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case SEARCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case SEARCH_PRODUCT_FAIL:
      return {
        loading: false,
        error:action.payload,
        product:[]
      };

    case CLEAR_ERRORS:
        return {
          ...state,
          error:null
        };

    default:
    return state;
    
  }
};