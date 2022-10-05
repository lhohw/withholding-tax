import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "App";
import Calculator from "features/calculator/Calculator";

const Main = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  </BrowserRouter>
);

export default Main;
