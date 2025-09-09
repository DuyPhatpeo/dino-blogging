import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user từ localStorage khi app mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signIn = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // lưu vào localStorage
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user"); // xóa khỏi localStorage
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
