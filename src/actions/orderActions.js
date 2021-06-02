import axios from "axios";
import * as TYPE from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(`/api/orders`, order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: TYPE.ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: TYPE.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//fetch order Detail
export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_DETAILS_REQUEST, payload: orderId });

  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.ORDER_DETAILS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: TYPE.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update order about payment
export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: TYPE.ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });

    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: TYPE.ORDER_PAY_SUCCESS, payload: data });
      console.log(data);
    } catch (error) {
      dispatch({
        type: TYPE.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// order Lists
export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_MINE_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/orders/mine`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.ORDER_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const summaryOrder = () => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders/summary", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.ORDER_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//all order list

export const listOrders =
  ({ seller = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: TYPE.ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/orders?seller=${seller}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: TYPE.ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: TYPE.ORDER_LIST_FAIL, payload: message });
    }
  };

//delete order
export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.ORDER_DELETE_FAIL, payload: message });
  }
};

//set order to deliver
export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.ORDER_DELIVER_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: TYPE.ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.ORDER_DELIVER_FAIL, payload: message });
  }
};
