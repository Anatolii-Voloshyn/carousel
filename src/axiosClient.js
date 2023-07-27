import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'https://picsum.photos/v2/',
});

export default axiosClient;