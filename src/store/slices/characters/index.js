import { createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { apiCallBegan } from "../../actions/actions";

const API_KEY = process.env.REACT_APP_API_KEY;

export const charactersSlice = createSlice({
  name: "character",
  initialState: [
    //Estado de Loading
    { id: 0, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 1, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 2, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 3, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 4, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
    { id: 5, value: "", sumPowers: 0, alignment: "", height: 0, weight: 0 },
  ],
  reducers: {
    charactersListRequested: (state, action) => {
      // const loading = action.payload
    },

    deleteCharacters: (state, action) => {
      state[action.payload].value = "";
    },
    charactersListRecived: (state, action) => {
      //recorer el obj en busca de buenos y malos
      //en caso de que sea uno de los dos sea full no guardar
      const { cardId, results } = action.payload;
      state[cardId].value = results[0];
      results[0].biography.alignment === "good"
        ? (state[cardId].alignment = "good")
        : (state[cardId].alignment = "bad");
      state[cardId].height = parseInt(
        results[0].appearance.height[1].replace(/\D/g, "")
      );
      state[cardId].weight = parseInt(
        results[0].appearance.weight[1].replace(/\D/g, "")
      );
      let sum = 0;
      let objP = results[0].powerstats;
      for (const [, value] of Object.entries(objP)) {
        if (value !== "null") sum += parseInt(value);
      }
      state[cardId].sumPowers = sum;
    },
    characterListFailed: (state, action) => {},
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

export const {
  charactersListRequested,
  deleteCharacters,
  charactersListRecived,
  characterListFailed,
} = charactersSlice.actions;

export default combineReducers({
  character: charactersSlice.reducer,
  spinner: spinnerSlice.reducer,
  error: errorSlice.reducer,
});

export const fetchCharacters = (name, cardId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      baseURL: "https://www.superheroapi.com/api.php/",
      apiKey: API_KEY,
      url: `/search/${name}`,
      customData: { name, cardId },
      onStart: charactersListRequested.type,
      onSuccess: charactersListRecived.type,
      onError: characterListFailed.type,
    })
  );
};

export const handleDelete = (id) => (dispatch) => {
  dispatch(deleteCharacters(id));
};
