import { AuthProvider } from "@contexts/authContext";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "@pages/SignUpPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
