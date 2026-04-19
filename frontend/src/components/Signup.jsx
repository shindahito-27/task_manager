import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { TaskContext } from "../TaskContext";
function Signup() {
  const navigate=useNavigate();
  const {BASE_URL}=useContext(TaskContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const repassword = document.getElementById("signup-re-password").value;
    if(password!=repassword){
      console.log("Re-Enter the same password");
      return;
    }
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({name,email,password})
    });
    const data=await response.json();
    if(data.success){
      console.log("User succesfully signed in");
      localStorage.setItem("auth-token",data.jwtToken);
      navigate("/home");
      console.log(data);
    }else {
      console.log("user exists or stuff happened sed");
    }
  };
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-form-panel">
          <form >
            <h2>Signup</h2>
            <p>Create your profile and start organizing beautifully.</p>
            <div>
              <label htmlFor="signup-username">Username</label>
              <br />
              <input type="text" id="signup-username" placeholder="Choose a username" />
            </div>
            <div>
              <label htmlFor="signup-email">Email</label>
              <br />
              <input type="email" id="signup-email" placeholder="name@example.com" />
            </div>
            <div>
              <label htmlFor="signup-password">Password</label>
              <br />
              <input type="password" id="signup-password" placeholder="Create a secure password" />
            </div>
            <div>
              <label htmlFor="signup-confirm-password">Re-enter Password</label>
              <br />
              <input type="password" id="signup-re-password" placeholder="Confirm your password" />
            </div>
            <div className="auth-actions">
              <button type="submit" className="btn-primary-solid" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Signup;
