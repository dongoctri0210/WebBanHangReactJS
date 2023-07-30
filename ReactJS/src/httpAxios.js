import axios from "axios";

const httpAxios = axios.create({
  baseURL: " http://localhost/dongoctri-reactjs/public/api/",
  timeout: 20000,
  headers: { "X-Custom-Header": "footbar" },
});
export default httpAxios;
