import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import Login from "./pages/Login/Login";
import OrdersPage from "./pages/Orders";
function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Only allow access to orders if authenticated */}
      <Route
        path="/orders"
        element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
export default App;
