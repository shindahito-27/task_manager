import "./App.css"
import { Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
function App(){
  return (
    <div className="page-shell">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}
export default App;
