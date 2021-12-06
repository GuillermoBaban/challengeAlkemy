import { configureStore } from "@reduxjs/toolkit";
import character from "./slices/characters/index";
import api from "./middlewar/api";

export default configureStore({
  reducer: {
    rootReducer: character,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api),
});
