import "./App.css";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import PrivateComponent from "./components/PrivateComponent";
import Recipes from "./components/Recipes";
import AddRecipe from "./components/AddRecipe";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";

function App() {
  return (
    <div className="bg-dark">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route element={<PrivateComponent />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
