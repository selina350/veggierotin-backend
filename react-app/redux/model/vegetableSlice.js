import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//action creation by thunk
export const getAllVegetables = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/vegetables");
    const { data } = response;

    dispatch(fetchVegetableSuccess(data.vegetables));
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


export const getNewVegetable = (vegetableId) => async (dispatch) => {
  try {
    await axios.post(`/api/users/1/vegetables/${vegetableId}`);
    const response = await axios.get("/api/vegetables/random");
    const { data } = response;
    dispatch(fetchVegetableSuccess(data.vegetables));
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

export const getThreeSuggestions = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/vegetables/random`);
    const { data } = response;
    dispatch(fetchVegetableSuccess(data.vegetables));
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

export const deleteVegetable = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/applications/${id}`);
    const { data } = response;
    dispatch(deleteApplicationSuccess({ id }));
    return data;
  } catch (e) {
    const { response } = e;
    if (response.status < 500) {
      const { data } = response;

      if (data.errors) {
        const formattedErrors = {};
        for (const err of data.errors) {
          const splitErr = err.split(" : ");
          formattedErrors[splitErr[0]] = splitErr[1];
        }
        throw Error(formattedErrors);
      } else {
        throw Error(["An error occurred. Please try again."]);
      }
    }
  }
};
const vegetableSlice = createSlice({
  name: "vegetables",
  initialState: { fetchPending: true },
  reducers: {
    fetchVegetableSuccess(state, action) {
      const newState = {};
      newState.fetchPending = false;
      action.payload.forEach((vegetable) => {
        newState[vegetable.id] = vegetable;
      });
      return newState;
    },
    deleteVegetableSuccess(state, action) {
      delete state[action.payload.id];
    },
  },
});

const { fetchVegetableSuccess, deleteVegetableSuccess } =
  vegetableSlice.actions;
export default vegetableSlice.reducer;
