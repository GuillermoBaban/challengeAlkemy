import { configureStore } from "@reduxjs/toolkit";
import character from "./slices/characters/index";

export default configureStore({
  reducer: {
    rootReducer: character,
  },
});
