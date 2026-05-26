import { useState } from "react";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userName, setUserName] = useState("علی علوی");

  const [profileImage, setProfileImage] = useState(
    "https://cdn.nody.ir/files/2024/09/13/nody-%D8%B9%DA%A9%D8%B3-%D9%BE%D8%B1%D8%B3%D9%86%D9%84%DB%8C-1726193886.webp",
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="profile-section">
      <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "ذخیره پروفایل" : "ویرایش پروفایل"}
      </button>

      <div className="profile-info">
        <div className="profile-text">
          {isEditing ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="name-input"
            />
          ) : (
            <h1>{userName}</h1>
          )}

          <p>خوش آمدید! به مسیر یادگیری خود ادامه دهید.</p>
        </div>

        <div className="profile-image-container">
          <img src={profileImage} alt="profile" className="profile-image" />

          {isEditing && (
            <>
              <label htmlFor="profile-upload" className="camera-icon">
                📷
              </label>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
