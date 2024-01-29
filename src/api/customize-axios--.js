import axios from "axios";
const instance = axios.create({
  baseURL: "https://localhost:7223",
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    // Thực hiện một số công việc trước khi gửi yêu cầu
    return config;
  },
  (error) => {
    // Xử lý lỗi yêu cầu
    return Promise.reject(error);
  }
);


// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
