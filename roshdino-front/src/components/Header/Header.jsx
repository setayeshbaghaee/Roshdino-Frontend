import { NavLink } from 'react-router-dom'
import './Header.css'
import { FaUser } from 'react-icons/fa'

function Header() {
  return (
    <header className='header'>
      <div className='header-container'>

        <div className='logo'>
          رشدینو
        </div>

        <nav className='nav-menu'>
          <NavLink to='/'>صفحه اصلی</NavLink>
          <NavLink to='/about'>درباره ما</NavLink>
          <NavLink to='/services'>خدمات</NavLink>
          <NavLink to='/articles'>مقالات</NavLink>
          <NavLink to='/contact'>تماس با ما</NavLink>
        </nav>

        <NavLink to='/login' className='login-btn'>
          <FaUser />
          ورود / ثبت‌نام
        </NavLink>

      </div>
    </header>
  )
}

export default Header