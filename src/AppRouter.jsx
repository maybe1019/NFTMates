import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CreateCollection from "./pages/CreateCollection/CreateCollection";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";

export default function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCollection />} />
        </Routes>
          <Footer />
      </BrowserRouter>
    </div>
  );
}
