import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  return <AuthContext.Provider {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
