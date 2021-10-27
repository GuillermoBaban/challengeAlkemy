import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

export async function passAndEmail(values) {
  console.log();
  try {
    const response = await axios({
      url: "http://challenge-react.alkemy.org/",
      method: "POST",
      data: values,
    });

    const {
      data: { token },
    } = response;

    localStorage.setItem("token", token);
    return true;
  } catch (e) {
    console.log(e);
  }
}

export async function getMethod(name) {
  return axios
    .get(`https://www.superheroapi.com/api.php/${API_KEY}/search/${name}`)
    .then((response) => {
      return response;
    });
}
