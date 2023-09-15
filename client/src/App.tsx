import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, RegisterPage } from "./pages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<h1>tasks page</h1>} />
          <Route path="/add-task" element={<h1>new task</h1>} />
          <Route path="/tasks/:id" element={<h1>update task</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;