/** @jsxImportSource @emotion/react */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layouts } from "./Layout/Layout";
import Categories from "./Pages/CompanyPage/company";
import { Job } from "./Pages/JobPage/job";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layouts />}>
          <Route index element={<Categories />}></Route>
          <Route path="/Job" element={<Job />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
