import { createSlice } from "@reduxjs/toolkit";
export const authenSlice = createSlice({
  //giá trị state được khởi tạo với tên SYS_Profile
  name: "SYS_Profile",
  initialState: {
    isAuthenticated: false,
    AccessToken: "",
    RefreshToken: "",
    NguoiDungId: "",
    MaTinh: "",
    MaHuyen: "",
    MaXa: "",
    IsRoot: false,
    IsRootSys: false,
    Permissions: [],
  },
  reducers: {
    login: (state, action) => {
      //giá trị được cập nhật = giá trị được truyền vào qua action
      state.isAuthenticated = action.payload.isAuthenticated;
      state.AccessToken = action.payload.AccessToken;
      state.RefreshToken = action.payload.RefreshToken;
      state.NguoiDungId = action.payload.NguoiDungId;
      state.MaTinh = action.payload.MaTinh;
      state.MaHuyen = action.payload.MaHuyen;
      state.MaXa = action.payload.MaXa;
      state.IsRoot = action.payload.IsRoot;
      state.IsRootSys = action.payload.IsRootSys;
      state.Permissions = action.payload.Permissions;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.AccessToken = "";
      state.RefreshToken = "";
      state.NguoiDungId = "";
      state.MaTinh = "";
      state.MaHuyen = "";
      state.MaXa = "";
      state.IsRoot = false;
      state.IsRootSys = false;
      state.Permissions = [];
    },
  },
});
export const { login, logout } = authenSlice.actions;
export default authenSlice.reducer;
 