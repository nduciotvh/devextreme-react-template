import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { getUser, signIn as sendSignInRequest } from "../api/auth";

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const result = await getUser();
      if (result.isOk) {
        setUser(result.data);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(
    async (userName, password, maTinh, maHuyen, maXa) => {
      const result = await sendSignInRequest(
        userName,
        password,
        maTinh,
        maHuyen,
        maXa
      );
      if (result.isOk) {
        console.log("check Token ->", result.data.AccessToken);
        localStorage.setItem("AccessToken", await result.data.AccessToken);
        setUser({
          userName: userName,
          maTinh: maTinh,
          maHuyen: maHuyen,
          maXa: maXa,
        });
      }

      return result;
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.clear();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, loading }}
      {...props}
    />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
