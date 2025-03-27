import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Reserve from "./pages/Reserve";
import Careers from "./pages/Careers";
import Apply from "./pages/Apply";
import Location from "./pages/Location";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/location" element={<Location />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;