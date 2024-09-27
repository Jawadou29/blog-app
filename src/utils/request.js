import axios from "axios";

const request = axios.create({
  // baseURL: "http://localhost:5000"
  baseURL: "https://blog-back-cwqx.onrender.com"
});

export default request;