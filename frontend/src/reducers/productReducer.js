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
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
        error: action.payload,
        product: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };

    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case ADMIN_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
        product: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
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
        error: action.payload,
        product: [],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

  

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
