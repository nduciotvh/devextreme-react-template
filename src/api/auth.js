import axiosClient from "./customize-axios";
export async function signIn(username, password, ma_tinh, ma_huyen, ma_xa) {
  try {
    const res = await axiosClient.post("/login", {
      username,
      password,
      ma_tinh,
      ma_huyen,
      ma_xa,
    });
    console.log("---res on login", res);
    return {
      isOk: true,
      data: res.Data,
      message: "Đăng nhập thành công",
    };
  } catch (error) {
    return {
      isOk: false,
      message: "Tài khoản hoặc mật khẩu không đúng",
    };
  }
}

export async function signOut(refreshToken) {
  try {
    const res = await axiosClient.post("/logout", {
      refreshToken,
    });
    //localStorage.clear();
    return {
      isOk: true,
      data: res.Data,
      message: "Đăng xuất thành công",
    };
  } catch {
    return {
      isOk: false,
      message: "Đăng xuất không thành công",
    };
  }
}

export async function getUser() {
  try {
    if (localStorage.getItem("AccessToken") !== null) {
      return {
        isOk: true,
        data: "",
      };
    } else {
      return {
        isOk: true,
        data: "",
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
