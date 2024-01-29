import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LoadIndicator from "devextreme-react/load-indicator";
import notify from "devextreme/ui/notify";
import { SelectBox, TextBox, CheckBox, Button } from "devextreme-react";
import { fetchAllTinh } from "../../api/DmTinh";
import { fetchHuyenByMaTinh } from "../../api/DmHuyen";
import { fetchXaByMaHuyenByMaTinh } from "../../api/DmXa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import {
  Validator,
  RequiredRule,
  StringLengthRule,
} from "devextreme-react/validator";
import { useDispatch, useSelector } from "react-redux";
import { signIn as sendSignInRequest } from "../../api/auth.js";
import { login } from "../../redux/authenSlice.js";
import "./LoginForm.scss";
import { navigation } from "../../app-navigation";

export default function LoginForm() {
  //#region state
  const [loading, setLoading] = useState(false);
  const [loadingTinh, setLoadingTinh] = useState(false);
  const [loadingHuyen, setLoadingHuyen] = useState(false);
  const [loadingXa, setLoadingXa] = useState(false);

  const [dmTinh, setDmTinh] = useState({});
  const [dmHuyen, setDmHuyen] = useState({});
  const [dmXa, setDmXa] = useState({});
  const [maTinh, setMaTinh] = useState("");
  const [maHuyen, setMaHuyen] = useState("");
  const [maXa, setMaXa] = useState("");

  const [userCaptcha, setUserCaptcha] = useState("");
  const authen = useSelector((state) => state.SYS_Profile);
  //#endregion
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useRef({
    userName: "",
    password: "",
    rememberMe: false,
  });
  //#region useEffect
  useEffect(() => {
    getDmTinh();
  }, []);
  useEffect(() => {
    let arr = [];
    maTinh.MA && arr.push(maTinh.MA);
    if (arr && arr.length) {
      setLoadingHuyen(true);
      setLoadingXa(true);
      getDmHuyen(arr);
      setTimeout(() => {
        setLoadingHuyen(false);
        setLoadingXa(false);
      }, 500);
    }
  }, [maTinh]);
  useEffect(() => {
    let arrMaTinh = [];
    let arrMaHuyen = [];
    maTinh.MA && arrMaTinh.push(maTinh.MA);
    maHuyen.MA && arrMaHuyen.push(maHuyen.MA);
    if (arrMaTinh && arrMaTinh.length && arrMaHuyen && arrMaHuyen.length) {
      setLoadingXa(true);
      getDmXa(arrMaTinh, arrMaHuyen);
      setTimeout(() => {
        setLoadingXa(false);
      }, 500);
    }
  }, [maTinh, maHuyen]);
  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);
  //#endregion
  const getDmTinh = async () => {
    let res = await fetchAllTinh();
    if (res && res.Data) {
      setDmTinh(res.Data);
    }
  };
  const getDmHuyen = async (arr) => {
    let res = await fetchHuyenByMaTinh(0, 0, arr, "");
    if (res && res.Data && res.Data.Data) {
      setDmHuyen(res.Data.Data);
    }
  };
  const getDmXa = async (arrMaTinh, arrMaHuyen) => {
    let res = await fetchXaByMaHuyenByMaTinh(
      0,
      0,
      arrMaTinh,
      arrMaHuyen,
      "",
      ""
    );
    if (res && res.Data && res.Data.Data) {
      setDmXa(res.Data.Data);
    }
  };
  //#region Submit
  const onSubmit = async (e) => {
    if (true) {
      const { userName, password } = formData.current;
      const res = await sendSignInRequest(
        userName,
        password,
        maTinh.MA,
        maHuyen.MA,
        maXa.MA
      );
      console.log(">>>>>>>res", res);
      if (res.isOk) {
        const dataProfile = res.data;
        const profile = {
          isAuthenticated: true,
          AccessToken: dataProfile.AccessToken,
          RefreshToken: dataProfile.RefreshToken,
          NguoiDungId: dataProfile.NguoiDungId,
          MaTinh: dataProfile.MaTinh,
          MaHuyen: dataProfile.MaHuyen,
          MaXa: dataProfile.MaXa,
          IsRoot: dataProfile.IsRoot,
          IsRootSys: dataProfile.IsRoot,
          Permissions: dataProfile.Permissions,
        };
        //dispatch gọi reducer có tên là login
        dispatch(login(profile));
        notify(res.message, "success", 2000);
        localStorage.setItem("AccessToken", dataProfile.AccessToken);
        localStorage.setItem("RefreshToken", dataProfile.RefreshToken);
        localStorage.setItem("Permissions", dataProfile.Permissions);
        navigate("/home");
      } else {
        setLoading(false);
        notify(res.message, "error", 2000);
        loadCaptchaEnginge(5);
      }
    } else {
      notify("Không đúng captcha", "error", 2000);
    }
  };
  //#endregion
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="dx-field">
        <label className="dx-field-label">Tên đăng nhập</label>
        <div className="dx-field-value">
          <TextBox
            value={formData.current.userName}
            onValueChanged={(e) => (formData.current.userName = e.value)}
            placeholder={"Tên đăng nhập"}
            mode={"text"}
            disabled={loading}
            validationMessageMode="always"
          >
            <Validator>
              <RequiredRule message="Tên đăng nhập không được để trống" />
              <StringLengthRule
                message="Tên đăng nhập từ 2 ký tự trở lên"
                min={2}
              />
            </Validator>
          </TextBox>
        </div>
      </div>
      <div className="dx-field">
        <label className="dx-field-label">Mật khẩu</label>
        <div className="dx-field-value">
          <TextBox
            value={formData.current.password}
            onValueChanged={(e) => (formData.current.password = e.value)}
            placeholder="Mật khẩu"
            mode={"text"}
            disabled={loading}
            validationMessageMode="always"
          >
            <Validator>
              <RequiredRule message="Tên đăng nhập không được để trống" />
              <StringLengthRule
                message="Tên đăng nhập từ 2 ký tự trở lên"
                min={6}
              />
            </Validator>
          </TextBox>
        </div>
      </div>
      <div className="dx-field">
        <label className="dx-field-label">Tỉnh/ Thành phố</label>
        <div className="dx-field-value">
          <SelectBox
            dataSource={dmTinh}
            displayExpr="TEN"
            searchEnabled={true}
            placeholder="Chọn Tỉnh"
            searchMode="contains"
            searchExpr="TEN"
            searchTimeout={200}
            minSearchLength={0}
            onValueChanged={(e) => setMaTinh(e.value)}
            disabled={loadingTinh}
            validationMessageMode="always"
          >
            <Validator>
              <RequiredRule message="Không được để trống" />
            </Validator>
            {loadingTinh && (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            )}
          </SelectBox>
        </div>
      </div>
      <div className="dx-field">
        <label className="dx-field-label">Mã Huyện</label>
        <div className="dx-field-value">
          <SelectBox
            dataSource={dmHuyen}
            displayExpr="TEN"
            searchEnabled={true}
            placeholder="Chọn Huyện"
            searchMode="contains"
            searchExpr="TEN"
            searchTimeout={200}
            minSearchLength={0}
            onValueChanged={(e) => setMaHuyen(e.value)}
            disabled={loadingHuyen}
            validationMessagePosition="bottom"
            validationMessageMode="always"
          >
            <Validator>
              <RequiredRule message="Không được để trống" />
            </Validator>
            {loadingHuyen && (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            )}
          </SelectBox>
        </div>
      </div>
      <div className="dx-field">
        <label className="dx-field-label">Mã Xã</label>
        <div className="dx-field-value">
          <SelectBox
            dataSource={dmXa}
            displayExpr="TEN"
            searchEnabled={true}
            placeholder="Chọn Xã"
            searchMode="contains"
            searchExpr="TEN"
            searchTimeout={200}
            minSearchLength={0}
            onValueChanged={(e) => setMaXa(e.value)}
            disabled={loadingXa}
            validationMessageMode="always"
          >
            <Validator>
              <RequiredRule message="Không được để trống" />
            </Validator>
            {loadingXa && (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            )}
          </SelectBox>
        </div>
      </div>
      <div className="dx-field">
        <CheckBox
          value={formData.current.rememberMe}
          onValueChanged={(e) => (formData.current.rememberMe = e.value)}
          text={"Remember me"}
          elementAttr={{ class: "form-text" }}
          disabled={loading}
        />
      </div>
      <div className="dx-field">
        <LoadCanvasTemplate />
        <label className="dx-field-label"> </label>
        <div className="dx-field">
          <TextBox
            value={userCaptcha}
            onValueChanged={(e) => setUserCaptcha(e.value)}
            placeholder={"Captcha"}
            disabled={loading}
            validationMessageMode="always"
          >
            <Validator>
              {/* <RequiredRule message="Không được để trống" /> */}
            </Validator>
          </TextBox>
        </div>
      </div>
      <Button
        width={"100%"}
        type={"default"}
        text={loading ? "" : "Đăng nhập"}
        disabled={loading}
        useSubmitBehavior={true}
        accessKey=""
      ></Button>
    </form>
  );
}
