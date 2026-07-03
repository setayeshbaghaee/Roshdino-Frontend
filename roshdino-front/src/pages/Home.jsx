import React from 'react';
import { useNavigate } from 'react-router-dom';

import "../styles/Home.css";



function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        const token = localStorage.getItem("access_token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className='home-container'>
            <div className='content-section'>
                <h1 className='main-title'>رشدینو</h1>

                <h2 className='sub-title'>
                    مسیر رشد شما، رسالت ماست
                </h2>

                <p className='description'>
                    ما در رشدینو همراه شما هستیم تا با آموزش کاربردی،
                    ابزارهای حرفه‌ای و پشتیبانی مستمر، مسیر رشد فردی و
                    شغلی خود را با اطمینان طی کنید.
                </p>

                <button className="cta-button" onClick={handleClick}>
                    پنل کاربری من
                </button>
            </div>

            <div className='path-illustration'></div>
        </div>
    );
}

export default Home;