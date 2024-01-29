import axiosClient from "./customize-axios";
const fetchAllTinh = () => {
  return axiosClient.get("/DanhMuc/GetDMTinhThanhPho");
};
export { fetchAllTinh };
