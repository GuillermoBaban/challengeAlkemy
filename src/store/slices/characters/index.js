import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const API_KEY = process.env.REACT_APP_API_KEY;

export const charactersSlice = createSlice({
  name: "character",
  initialState: [
    { id: 0, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 1, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 2, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 3, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 4, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 5, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
  ],
  reducers: {
    setCharactersList: (state, action) => {
      const { cardId, data } = action.payload;
      state[cardId].value = data.results[0];
      data.results[0].biography.alignment === "good"
        ? (state[cardId].alignment = "good")
        : (state[cardId].alignment = "bad");
      state[cardId].height = parseInt(
        data.results[0].appearance.height[1].replace(/\D/g, "")
      );
      state[cardId].weight = parseInt(
        data.results[0].appearance.weight[1].replace(/\D/g, "")
      );
      let sum = 0;
      let objP = data.results[0].powerstats;
      for (const [, value] of Object.entries(objP)) {
        if (value !== "null") sum += parseInt(value);
      }
      state[cardId].sumPowers = sum;
    },

    deleteCharacters: (state, action) => {
      state[action.payload].value = "";
    },
  },
});

export const spinnerSlice = createSlice({
  name: "spinner",
  initialState: false,
  reducers: {
    setSpinner: (state, action) => (state = action.payload),
  },
});

export const errorSlice = createSlice({
  name: "error",
  initialState: "",
  reducers: {
    setError: (state, action) => (state = action.payload),
  },
});

export const { setCharactersList, deleteCharacters } = charactersSlice.actions;
export const { setSpinner } = spinnerSlice.actions;
export const { setError } = errorSlice.actions;

export default combineReducers({
  character: charactersSlice.reducer,
  spinner: spinnerSlice.reducer,
  error: errorSlice.reducer,
});

export const fetchCharacters =
  (name, cardId, fullGoodCharacter, fullBadCharacter) => (dispatch) => {
    dispatch(setSpinner(true));
    axios
      .get(`https://www.superheroapi.com/api.php/${API_KEY}/search/${name}`)
      .then((response) => {
        dispatch(setSpinner(false));
        if (
          response.data.response === "success" &&
          !fullGoodCharacter &&
          response.data.results[0].biography.alignment === "good"
        ) {
          dispatch(setCharactersList({ data: response.data, cardId }));
        } else if (
          response.data.response === "success" &&
          !fullBadCharacter &&
          response.data.results[0].biography.alignment === "bad"
        ) {
          dispatch(setCharactersList({ data: response.data, cardId }));
        }
        if (response.data.response === "error") {
          dispatch(setError(response.data.error));
        }
      });
  };

export const handleDelete = (id) => (dispatch) => {
  dispatch(deleteCharacters(id));
};
