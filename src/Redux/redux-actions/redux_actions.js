import {
  PRODUCTS_ACTION_TYPES,

} from "../redux-actions/redux_action_types";

export function checkOut() {
  return { type: PRODUCTS_ACTION_TYPES.CHECKOUT };
}
export function setCategories(payload) {
  return { type: PRODUCTS_ACTION_TYPES.SET_CATEGORIES, payload };
}
export function setSelectedCategories(payload) {
  return { type: PRODUCTS_ACTION_TYPES.SET_SELECTED_CATEGORY, payload };
}
export function setSelectedProduct(payload) {
  return { type: PRODUCTS_ACTION_TYPES.SELECTED_PRODUCT, payload };
}
export function setCurrency(payload) {
  return { type: PRODUCTS_ACTION_TYPES.CURRENCY, payload };
}
export function addToCard(payload) {
  return { type: PRODUCTS_ACTION_TYPES.ADD_TO_CART, payload };
}
export function cartProductCount(payload) {
  return { type: PRODUCTS_ACTION_TYPES.CHANGE_COUNT, payload };
}
export function cartProductChangeAtr(payload) {
  return { type: PRODUCTS_ACTION_TYPES.CHANGE_ATTRIBUTE, payload };
}
export function showMiniCart(payload) {
  return { type: PRODUCTS_ACTION_TYPES.SHOW_MINI_CART, payload };
}
