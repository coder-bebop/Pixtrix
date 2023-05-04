import { createContext, useState } from "react";

export const AuthContext = createContext({
  tokenId: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState("");

  function authenticateUser(token) {
    setAuthToken(token);
  }

  function logoutUser() {
    setAuthToken(null);
  }

  const contextValue = {
    tokenId: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticateUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
