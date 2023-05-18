import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from "../../backend/firebase";
import { AuthType } from "../../constants/models/auth";

export const AuthContext = createContext({
  user: null as User,
  getToken: (forceRefresh = true): Promise<string> =>
    new Promise<string>(() => {}),
  authenticate: (
    mode: AuthType,
    email: string,
    password: string
  ): Promise<string> => new Promise<string>(() => {}),
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState<User>(null);

  function getToken(forceRefresh = true) {
    return user?.getIdToken(forceRefresh);
  }

  async function authenticate(mode: AuthType, email: string, password: string) {
    let callback: Function;

    try {
      if (mode === AuthType.Create) {
        callback = createUserWithEmailAndPassword;
      } else if (mode === AuthType.LogIn) {
        callback = signInWithEmailAndPassword;
      }

      const userCredential: UserCredential = await callback(
        auth,
        email,
        password
      );

      setUser(userCredential?.user);

      return userCredential?.user?.getIdToken(true);
    } catch (error) {
      throw new Error(error);
    }
  }

  function logout() {
    setUser(null);
  }

  const contextValue = {
    user: user,
    getToken: getToken,
    authenticate: authenticate,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
