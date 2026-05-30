import './Services.css'

function Services() {
  return (
    <div className='services-page-container'>
      <div className='glass-box'>
        <h1 className='services-title'>خدمات رشدینو</h1>

        <p className='services-text'>
          رشدینو با تحلیل هدف، زمان و شرایط شما، مناسب‌ترین دوره‌های
          آموزشی را پیشنهاد می‌دهد و با ابزارهای برنامه‌ریزی و پشتیبانی،
          کمک می‌کند مسیر یادگیری خود را با نظم و اطمینان طی کنید.
        </p>

        <div className='services-features'>
          <div className='service-card'>
            <h3>پیشنهاد هوشمند دوره</h3>
            <p>
              بر اساس هدف و علاقه شما، بهترین دوره‌های آموزشی انتخاب
              و معرفی می‌شوند.
            </p>
          </div>

          <div className='service-card'>
            <h3>برنامه‌ریزی شخصی</h3>
            <p>
              مدت زمان مورد نظر خود را تعیین کنید تا مسیر یادگیری
              متناسب با آن طراحی شود.
            </p>
          </div>

          <div className='service-card'>
            <h3>پشتیبانی مستمر</h3>
            <p>
              در طول مسیر آموزش، همراه شما هستیم تا روند یادگیری
              متوقف نشود.
            </p>
          </div>

          <div className='service-card'>
            <h3>پیگیری پیشرفت</h3>
            <p>
              میزان پیشرفت و اهداف باقی‌مانده را به صورت منظم
              مشاهده و مدیریت کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services