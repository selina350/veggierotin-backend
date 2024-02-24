import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getSuggestionsForGuest,
  storeGuestPickedVegetable,
} from "../../utils/vegetableHelper";

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
  const isLogedIn = false;
  //Todos: Add user login logic
  // const isLogedIn = getState().controller.user;
  if (isLogedIn) {
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
  } else {
    //guest mode
    storeGuestPickedVegetable(vegetableId);
    const vegetables = await getSuggestionsForGuest();
    dispatch(fetchVegetableSuccess(vegetables));
  }
};

export const getThreeSuggestions = () => async (dispatch, getState) => {
  const isLogedIn = false;
  //Todos: Add user login logic
  // const isLogedIn = getState().controller.user;
  if (isLogedIn) {
    //loged in user
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
  } else {
    //guest mode
    const isInitLoad = getState().model.vegetables.fetchPending;
    const vegetables = await getSuggestionsForGuest(isInitLoad);
    dispatch(fetchVegetableSuccess(vegetables));
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
