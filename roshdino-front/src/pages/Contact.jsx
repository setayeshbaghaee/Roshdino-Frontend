import React from 'react';
import './Contact.css';

function Contact() {
  const emails = [
    { address: 'f_mohammadi84@comp.iust.ac.ir' },
    { address: 'm_mohammadi84@comp.iust.ac.ir' },
    { address: 'fatemeh_abdullahi@comp.iust.ac.ir' },
    { address: 'm_pahlevani@comp.iust.ac.ir' },
    { address:'y_javadzadeh@comp.iust.ac.ir' }
  ];

  return (
    <div className='contact-page-container'>
      <div className='glass-box'>
        <h1 className='contact-title'>تماس با ما</h1>
        <p className='contact-description'>
          برای ارتباط با تیم ما می‌توانید از ایمیل‌های زیر استفاده کنید:
        </p>

        <div className='emails-grid'>
          {emails.map((item, index) => (
            <div key={index} className='email-item'>
              <a href={`mailto:${item.address}`} className='email-link'>
                {item.address}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
