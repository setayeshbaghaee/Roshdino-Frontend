import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="glass-box">
                <h1 className="not-found-title">۴۰۴</h1>
                <h2 className="not-found-text">صفحه مورد نظر پیدا نشد</h2>
                <p className="not-found-description">
                    متأسفانه صفحه‌ای که به دنبالش بودید وجود ندارد <br />
                    یا ممکن است آدرس آن تغییر کرده باشد.
                </p>
                <Link to="/" className="home-button">
                    بازگشت به صفحه اصلی 
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
