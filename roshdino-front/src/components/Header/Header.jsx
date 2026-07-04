import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import "./Header.css"
import { FaUser } from "react-icons/fa"
import { api } from "../../api/client"

function Header() {
  const navigate = useNavigate()

  const token = localStorage.getItem("access_token")

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token")

      if (refresh) {
        await api.post("/accounts/logout/", {
          refresh: refresh,
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      setMenuOpen(false)

      navigate("/login")
    }
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {/* ================= HEADER ================= */}

      <header className="header">
        <div className="header-container">

          {/* LOGO */}
          <div className="logo">
            رشدینو
          </div>


          {/* DESKTOP MENU */}
          <nav className="nav-menu">

            <NavLink to="/">
              صفحه اصلی
            </NavLink>

            <NavLink to="/about">
              درباره ما
            </NavLink>

            <NavLink to="/services">
              خدمات
            </NavLink>

            <NavLink to="/courses">
              دوره ها
            </NavLink>

            <NavLink to="/contact">
              تماس با ما
            </NavLink>

          </nav>


          {/* DESKTOP AUTH */}
          <div className="auth-box">

            {token ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="login-btn"
                >
                  <FaUser />

                  داشبورد
                </NavLink>

                <button
                  className="cta-button"
                  onClick={handleLogout}
                >
                  خروج
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="login-btn"
              >
                <FaUser />

                ورود / ثبت‌نام
              </NavLink>
            )}

          </div>


          {/* HAMBURGER */}
          <button
            type="button"
            className="hamburger"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

        </div>
      </header>


      {/* ================= MOBILE MENU ================= */}

      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
      >

        <button
          type="button"
          className="close-btn"
          onClick={closeMenu}
        >
          ✕
        </button>


        {/* MOBILE LINKS */}

        <NavLink
          to="/"
          onClick={closeMenu}
        >
          صفحه اصلی
        </NavLink>

        <NavLink
          to="/about"
          onClick={closeMenu}
        >
          درباره ما
        </NavLink>

        <NavLink
          to="/services"
          onClick={closeMenu}
        >
          خدمات
        </NavLink>

      
        <NavLink
          to="/courses"
          onClick={closeMenu}
        >
          دوره‌ها
        </NavLink>

        <NavLink
          to="/contact"
          onClick={closeMenu}
        >
          تماس با ما
        </NavLink>


        <hr
          style={{
            width: "100%",
            opacity: 0.2,
          }}
        />


        {/* MOBILE AUTH */}

        {token ? (
          <>
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
            >
              <FaUser />

              داشبورد
            </NavLink>

            <button
              type="button"
              className="cta-button"
              onClick={handleLogout}
            >
              خروج
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={closeMenu}
          >
            <FaUser />

            ورود / ثبت‌نام
          </NavLink>
        )}

      </div>
    </>
  )
}

export default Header
