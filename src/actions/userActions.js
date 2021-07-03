import {api} from "../api/api";
import * as TYPE from "../constants/userConstants";

//Register new User
export const register =
  (name, email, password) => async (dispatch, getState) => {
    dispatch({
      type: TYPE.USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const { data } = await api.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch({ type: TYPE.USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: TYPE.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//SignIn User
export const signIn = (email, password) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await api.post("/api/users/signin", { email, password });
    dispatch({ type: TYPE.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TYPE.USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: TYPE.USER_SIGNOUT });
  document.location.href = "/signin";
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await api.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await api.put("/api/users/profile", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: TYPE.USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: TYPE.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await api.get("/api/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//edit user
export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await api.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TYPE.USER_UPDATE_FAIL, payload: message });
  }
};

//delete user
export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: TYPE.USER_DELETE_REQUEST, payload: userId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await api.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: TYPE.USER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TYPE.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};