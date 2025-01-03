import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AllProducts, Login } from "./components";
import { CheckProducts } from "./components";
import LayoutPage from "./Layout/Layout";
import { NotFound } from "./components/NotFound";
import { useState } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [regionSelect, setRegionSelect] = useState<string>("SHOTA");

  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route
          element={
            <LayoutPage
              search={search}
              setSearch={setSearch}
              regionSelect={regionSelect}
              setRegionSelect={setRegionSelect}
            />
          }
        >
          <Route
            path="/checkProducts"
            element={
              <ProtectedRoute>
                <CheckProducts search={search} regionSelect={regionSelect} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allProducts"
            element={
              <ProtectedRoute>
                <AllProducts />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
