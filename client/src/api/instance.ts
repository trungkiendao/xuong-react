// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000", // Cập nhật URL này theo API của bạn
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Hoặc lấy token từ bất cứ đâu bạn lưu trữ nó
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001"
})

axiosInstance.interceptors.request.use(
  (config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization  = `Bearer ${token}`
    return config
  }
)

export default axiosInstance