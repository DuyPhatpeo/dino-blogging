import { AuthProvider } from "@contexts/authContext";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "@pages/SignUpPage";
import SignInPage from "@pages/SignInPage";
import HomePage from "@pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
