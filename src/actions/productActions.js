import {api} from "../api/api";
import * as TYPE from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: TYPE.PRODUCT_LIST_REQUEST });
  try {
    const { data } = await api.get("/api/products");
    // const { data } = await api({url:"/api/products",method:"get"});
    dispatch({ type: TYPE.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TYPE.PRODUCT_LIST_FAIL, payload: error.message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: TYPE.PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const { data } = await api.get(`/api/products/${productId}`);
    dispatch({ type: TYPE.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update product
export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: TYPE.PRODUCT_UPDATE_REQUEST, payload: product });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await api.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.PRODUCT_UPDATE_FAIL, error: message });
  }
};

//delete product
export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = api.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.PRODUCT_DELETE_FAIL, payload: message });
  }
};
