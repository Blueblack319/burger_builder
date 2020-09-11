import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-builder-bc2e4.firebaseio.com/",
});

export default instance;
