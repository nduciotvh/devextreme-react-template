import { configureStore } from "@reduxjs/toolkit";
import SYS_ProfileReducer from "./authenSlice";
export default configureStore({
  reducer: { SYS_Profile: SYS_ProfileReducer },
});
