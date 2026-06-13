import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (!identifier.trim()) {
      setError("لطفاً ایمیل یا نام کاربری را وارد کنید.");
      return;
    }
    
    if (!password.trim()) {
      setError("لطفاً رمز عبور را وارد کنید.");
      return;
    }

    if (password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    

    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        
        navigate("/dashboard");

      } else {
        setError(data.detail || "نام کاربری یا رمز عبور اشتباه است.");
      }
    } catch (err) {
      setError("ارتباط با سرور برقرار نشد. لطفا بعدا تلاش کنید.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">ورود به رشدینو</h2>
        <p className="auth-description">
          خوش آمدید! برای ادامه، اطلاعات خود را وارد کنید</p>
        
        <form onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <input
              type="text"
              placeholder="ایمیل یا نام کاربری"
              className="auth-input"
              value={identifier}            
              onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="رمز عبور"
              className="auth-input"
              value={password}         
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">
            ورود
          </button>
        </form>

        <div className="auth-footer">
          <span>حساب کاربری ندارید؟</span>
          <Link to="/register" className="auth-link">ثبت‌نام کنید</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
