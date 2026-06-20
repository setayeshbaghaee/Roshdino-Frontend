import './Footer.css'

import {
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa'

import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>

        {/* BRAND */}
        <div className='footer-section'>
          <h2>رشدینو</h2>
          <p>
            رشدینو یک پلتفرم جامع برای رشد فردی و شغلی است.
          </p>
        </div>

        {/* LINKS */}
        <div className='footer-section'>
          <h3>دسترسی سریع</h3>
          <NavLink to='/'>صفحه اصلی</NavLink>
          <NavLink to='/about'>درباره ما</NavLink>
          <NavLink to='/services'>خدمات</NavLink>
          <NavLink to='/articles'>مقالات</NavLink>
          <NavLink to='/contact'>تماس با ما</NavLink>
        </div>

        {/* SERVICES */}
        <div className='footer-section'>
          <h3>خدمات ما</h3>
          <p>آموزش آنلاین</p>
          <p>مشاوره تخصصی</p>
          <p>ابزارهای کاربردی</p>
          <p>پشتیبانی VIP</p>
        </div>

        {/* CONTACT */}
        <div className='footer-section'>
          <h3>ارتباط با ما</h3>

          <p><FaPhone /> 021-12345678</p>
          <p><FaEnvelope /> info@roshdino.com</p>

          <div className='socials'>
            <FaInstagram />
            <FaTelegram />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className='footer-bottom'>
        تمامی حقوق محفوظ است.
      </div>
    </footer>
  )
}

export default Footer