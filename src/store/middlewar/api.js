import axios from "axios";

const api = ({ dispatch }) => {
  return (next) => {
    return async (action) => {
      console.log("tola");
      try {
        const response = await axios.request({
          baseURL:
            "https://www.superheroapi.com/api.php/10224815768208941/search/batman",
        });
        dispatch(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  };
};
export default api;
