import Navbar from "./components/Navbar/Navbar";
import SingleProduct from "./components/Pages/SingleProduct";
import MainPage from "./components/Pages/MainPage";
import CartPage from "./components/Pages/CartPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
