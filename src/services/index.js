import axios from "axios";

export async function passAndEmail(values) {
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
    return e.response.status;
  }
}
