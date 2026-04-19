import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
function Navbar() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("auth-token");
    navigate("/");
  }
  return (
    <nav className="app-navbar">
      <div className="brand-lockup">
        <div className="brand-mark">TM</div>
        <div className="brand-copy">
          <h1>Task Manager</h1>
          <p>Bright planning for your everyday notes and tasks.</p>
        </div>
      </div>
      <div className="nav-actions">
        <div className="nav-chip">Today feels productive</div>
        <div >
          <input type="search" placeholder="Search your notes" aria-label="Search your notes" />
        </div>
        <button className="btn-logout" type="button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
export default Navbar;
