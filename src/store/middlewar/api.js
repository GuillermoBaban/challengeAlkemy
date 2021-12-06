import Axios from "axios";
import { apiCallBegan } from "../actions/actions";

const api = ({ dispatch }) => {
  return (next) => {
    return async (action) => {
      if (action.type !== apiCallBegan.type) return next(action);

      const {
        baseURL,
        apiKey,
        url,
        params,
        headers = {},
        method,
        data,
        customData = {},
        onStart,
        onSuccess,
        onError,
      } = action.payload;

      if (onStart) {
        dispatch({ type: onStart });
      }
      next(action);
      try {
        const response = await Axios.request({
          url,
          baseURL: `${baseURL}${apiKey || ""}`,
          params,
          method,
          data,
          headers,
        });
        if (onSuccess) {
          dispatch({
            type: onSuccess,
            payload: { ...response.data, ...customData },
          });
        }
      } catch (err) {
        dispatch({ type: onError });
      }
    };
  };
};
export default api;
