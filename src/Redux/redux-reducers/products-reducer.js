import { PRODUCTS_ACTION_TYPES } from "../redux-actions/redux_action_types";

export const initialState = {
  categories: [],
  selectedCategory: "",
  selectedProduct: "",
  currency: "",
  cart: [],
  showMiniCart: false,
};

export const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {

    case PRODUCTS_ACTION_TYPES.CHECKOUT: {
      return {
        ...state,
        cart: []
      };
    }
    case PRODUCTS_ACTION_TYPES.SHOW_MINI_CART: {
      return {
        ...state,
        showMiniCart: action.payload
      };
    }

    case PRODUCTS_ACTION_TYPES.CHANGE_COUNT: {

      const index = state.cart.findIndex(item => item.id === action.payload.id); //finding index of the item
      const newArray = [...state.cart]; //making a new array
      newArray[index].count = action.payload.count//changing value in the new array
      return {
        ...state, //copying the orignal state
        cart: newArray, //reassingning todos to new array
      }
    }
    case PRODUCTS_ACTION_TYPES.CHANGE_ATTRIBUTE: {

      const index = state.cart.findIndex(item => item.product.id === action.payload.id); //finding index of the item
      const newArray = [...state.cart]; //making a new array
      newArray[index].attributes = action.payload.attribut//changing value in the new array
      return {
        ...state, //copying the orignal state
        cart: newArray, //reassingning todos to new array
      }
    }

    case PRODUCTS_ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };

    case PRODUCTS_ACTION_TYPES.CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    case PRODUCTS_ACTION_TYPES.SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload
      };
    case PRODUCTS_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case PRODUCTS_ACTION_TYPES.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };


    default:
      return state;
  }
};