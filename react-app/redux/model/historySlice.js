import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getAllVegetablesforUser1 = () => async (dispatch) => {
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

const { fetchHistorySuccess, deleteHistorySuccess } =
historySlice.actions;
export default historySlice.reducer;
