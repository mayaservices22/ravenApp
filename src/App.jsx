import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Otps from "./pages/Otps";
import Pins from "./pages/Pins";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/otp" element={<Otps />} />
          <Route path="/pin" element={<Pins />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
