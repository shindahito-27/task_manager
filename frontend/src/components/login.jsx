import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import { useEffect} from "react";
function Login() {
  const navigate = useNavigate();

  //if already logged in
  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
    navigate("/home");
  }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const response = await fetch("http://localhost:8080/auth/login", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({email,password})
    });
    const data=await response.json();
    if(data.success){
      localStorage.setItem("auth-token",data.jwtToken);
      console.log("User exists Login successful ");
      console.log(data);
      navigate("/home");
    }else {
      console.log("wrong pass or stuff");
    }
  };
  const handleSignup = () => {
    navigate("/Signup");
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-form-panel">
          <form>
            <h2>Login</h2>
            <p>Sign in to continue organizing your day.</p>
            <div>
              <label htmlFor="login-email">Email</label>
              <br />
              <input
                type="email"
                id="login-email"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label htmlFor="login-password">Password</label>
              <br />
              <input
                type="password"
                id="login-password"
                placeholder="Enter your password"
              />
            </div>
            <div className="auth-actions">
              <button type="submit" className="btn-primary-solid" onClick={handleSubmit}>
                Sign in
              </button>
              <button
                type="button"
                className="btn-secondary-ghost"
                onClick={handleSignup}>
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Login;
