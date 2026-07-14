import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.username.trim()) {
      setError("لطفاً نام کاربری را وارد کنید.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      setError("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    if (!formData.password) {
      setError("لطفاً رمز عبور را وارد کنید.");
      return;
    }

    if (formData.password.length < 8) {
      setError("رمز عبور باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    if (/^\d+$/.test(formData.password)) {
      setError("رمز عبور باید علاوه بر عدد، شامل حروف نیز باشد.");
      return;
    }

    if (!formData.password2) {
      setError("لطفاً تکرار رمز عبور را وارد کنید.");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("رمز عبور و تکرار آن همخوانی ندارند.");
      return;
    }

    try {
      const response = await fetch(  "https://roshdino.chbkn.dev/api/accounts/signin/",
 {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("ثبت‌نام موفقیت‌آمیز بود.");
        navigate("/login");
      } else {
        const backendError = Object.values(data).flat()[0];

        if (backendError === "user with this email already exists.") {
          setError("کاربری با این ایمیل قبلاً ثبت‌نام کرده است.");
        } else if (backendError === "user with this username already exists.") {
          setError("این نام کاربری قبلاً استفاده شده است.");
        } else {
          setError(backendError || "خطا در ثبت‌نام");
        }
      }
    } catch (err) {
      setError("خطا در اتصال به سرور.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">ثبت‌نام در رشدینو</h2>
        <p>همین حالا ثبت‌نام کنید و مسیر رشد خود را آغاز کنید</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-field">
            <input
              type="text"
              placeholder="نام کاربری"
              className="auth-input"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="auth-field">
            <input
              type="email"
              placeholder="ایمیل"
              className="auth-input"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="رمز عبور"
              className="auth-input"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="auth-field">
            <input
              type="password"
              placeholder="تکرار رمز عبور"
              className="auth-input"
              value={formData.password2}
              onChange={(e) => setFormData({...formData, password2: e.target.value})}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

        <button className="auth-button">ثبت‌نام</button>

        </form>
        
        <div className="auth-footer">
          <span>حساب کاربری دارید؟</span>
          <Link to="/login" className="auth-link">ورود</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

