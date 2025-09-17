import { createContext, useContext, useState, useEffect } from "react";
import { userRole, userStatus } from "@/utils/constants";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user từ localStorage khi app mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = (userData) => {
    // userData nên có { uid, email, fullname, role, status }
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUser = (newData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  // ✅ Các helper check nhanh role/status
  const isAdmin = user?.role === userRole.ADMIN;
  const isModerator = user?.role === userRole.MODERATOR;
  const isActive = user?.status === userStatus.ACTIVE;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateUser,
        isAdmin,
        isModerator,
        isActive,
      }}
    >
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
