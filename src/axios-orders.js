import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-e6390.firebaseio.com/"
});

export default instance;
