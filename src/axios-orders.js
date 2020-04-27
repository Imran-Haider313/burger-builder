import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-bui.firebaseio.com/"
});

export default instance;
