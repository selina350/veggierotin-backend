import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getUserPickHisotry,
  userPickHistory,
} from "../../utils/vegetableHelper";

export const getUserHistories = () => async (dispatch, getState) => {
  const isLogedIn = false;
  //Todos: Add user login logic
  // const isLogedIn = getState().controller.user;
  if (isLogedIn) {
    try {
      const response = await axios.get("/api/users/1/vegetables");
      const { data } = response;
      dispatch(fetchHistorySuccess(data.user_vegetables));
    } catch (e) {
      const { response } = e;
      if (response.status < 500) {
        const { data } = response;
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
    }
  } else {
    //guest mode
    const userPickHistory = await getUserPickHisotry();
    dispatch(fetchHistorySuccess(userPickHistory));
  }
};

const historySlice = createSlice({
  name: "history",
  initialState: { fetchPending: true },
  reducers: {
    fetchHistorySuccess(state, action) {
      const newState = {};
      newState.fetchPending = false;
      action.payload.forEach((user_vegetable) => {
        newState[user_vegetable.id] = user_vegetable;
      });
      return newState;
    },
    deleteHistorySuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

const { fetchHistorySuccess, deleteHistorySuccess } = historySlice.actions;
export default historySlice.reducer;
