import { combineReducers } from "redux";
import { ProductsReducer } from "./products-reducer";
const rootReducer = combineReducers({
  ProductsReducer: ProductsReducer,
});

export default rootReducer;
