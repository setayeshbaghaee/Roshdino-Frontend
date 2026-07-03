import { useEffect, useState } from "react";
import { getMe, updateMe } from "../../api/accounts";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  // گرفتن اطلاعات از بک
  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await getMe();

      setUserName(data.username);
      setEmail(data.email);

    } catch (err) {
      console.log("PROFILE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ذخیره تغییرات
  const handleSave = async () => {
    try {
      const updated = await updateMe({
        username: userName,
        email: email,
      });

      setUserName(updated.username);
      setEmail(updated.email);

      setIsEditing(false);

    } catch (err) {
      console.log("UPDATE PROFILE ERROR:", err);
    }
  };

  if (loading) {
    return <p>در حال دریافت پروفایل...</p>;
  }

  return (
    <div className="profile-section">

      <button
        className="edit-btn"
        onClick={() => {
          if (isEditing) {
            handleSave();
          } else {
            setIsEditing(true);
          }
        }}
      >
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

          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
          ) : (
            <p>{email}</p>
          )}

          <p>خوش آمدید! به مسیر یادگیری خود ادامه دهید.</p>

        </div>

      </div>
    </div>
  );
};

export default ProfileSection;