import { useEffect, useRef, useState } from "react";

import {
  getProfile,
  updateProfile,
  uploadProfileAvatar,
  deleteProfileAvatar,
} from "../../api/accounts";


const ProfileSection = () => {
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [avatarUrl, setAvatarUrl] = useState(null);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const createFreshAvatarUrl = (url) => {
    if (!url) return null;

    const separator = url.includes("?") ? "&" : "?";

    return `${url}${separator}v=${Date.now()}`;
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      setUserName(data?.username || "");
      setEmail(data?.email || "");

      setAvatarUrl(
        createFreshAvatarUrl(data?.avatar_url)
      );

    } catch (err) {
      console.log("GET PROFILE ERROR:", err);

      setError("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);
  const handleEditButtonClick = async () => {
  console.log("PROFILE BUTTON CLICKED", {
    isEditing,
    savingProfile,
    userName,
    email,
  });

  if (!isEditing) {
    setMessage("");
    setError("");
    setIsEditing(true);
    return;
  }

  await handleSaveProfile();
};

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true);
      setError("");
      setMessage("");

      const updated = await updateProfile({
        username: userName.trim(),
        email: email.trim(),
      });

      setUserName(updated?.username || "");
      setEmail(updated?.email || "");

      if (updated?.avatar_url) {
        setAvatarUrl(
          createFreshAvatarUrl(updated.avatar_url)
        );
      }

      setIsEditing(false);
      setMessage("پروفایل با موفقیت ذخیره شد");

    } catch (err) {
      console.log("UPDATE PROFILE ERROR:", err);

      setError(
        err?.response?.data?.detail ||
        "خطا در ذخیره تغییرات پروفایل"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("لطفاً فقط فایل تصویری انتخاب کنید");

      event.target.value = "";

      return;
    }
    try {
      setAvatarLoading(true);
      setError("");
      setMessage("");

      const updatedProfile =
        await uploadProfileAvatar(file);

      setAvatarUrl(
        createFreshAvatarUrl(
          updatedProfile?.avatar_url
        )
      );

      setMessage(
        avatarUrl
          ? "عکس پروفایل با موفقیت تغییر کرد"
          : "عکس پروفایل با موفقیت آپلود شد"
      );

    } catch (err) {
      console.log("UPLOAD AVATAR ERROR:", err);

      setError(
        err?.response?.data?.avatar?.[0] ||
        err?.response?.data?.detail ||
        "خطا در آپلود عکس پروفایل"
      );
    } finally {
      setAvatarLoading(false);
      event.target.value = "";
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      setAvatarLoading(true);
      setError("");
      setMessage("");

      await deleteProfileAvatar();

      setAvatarUrl(null);

      setMessage("عکس پروفایل حذف شد");

    } catch (err) {
      console.log("DELETE AVATAR ERROR:", err);

      setError(
        err?.response?.data?.detail ||
        "خطا در حذف عکس پروفایل"
      );
    } finally {
      setAvatarLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-section profile-loading">
        در حال دریافت پروفایل...
      </div>
    );
  }

  return (
    <div className="profile-section">

      <div className="profile-info">

        <div className="avatar-column">

          <button
            type="button"
            className="avatar-shell"
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarLoading}
            aria-label="انتخاب عکس پروفایل"
          >

            {avatarLoading ? (

              <div className="avatar-loading-text">
                در حال آپلود...
              </div>

            ) : avatarUrl ? (

              <img
                src={avatarUrl}
                alt="عکس پروفایل"
                className="profile-avatar"
                onError={() => setAvatarUrl(null)}
              />

            ) : (

              <div className="default-avatar">

                <span className="default-avatar-icon">
                  +
                </span>

                <span>
                  آپلود عکس
                </span>

              </div>

            )}

          </button>


          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />
          <div className="avatar-actions">

            {avatarUrl ? (
              <button
                type="button"
                className="avatar-action-btn delete-avatar-btn"
                onClick={handleDeleteAvatar}
                disabled={avatarLoading}
              >
                حذف عکس
              </button>
            ) : (
              <button
                type="button"
                className="avatar-action-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={avatarLoading}
              >
                انتخاب عکس
              </button>
            )}

          </div>

        </div>



        <div className="profile-text">

          {isEditing ? (

            <input
              type="text"
              value={userName}
              onChange={(e) =>
                setUserName(e.target.value)
              }
              className="name-input"
              placeholder="نام کاربری"
            />

          ) : (

            <h1>
              {userName || "کاربر"}
            </h1>

          )}

          {isEditing ? (

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="email-input"
              placeholder="ایمیل"
            />

          ) : (

            <p className="profile-email">
              {email}
            </p>

          )}


          <p className="welcome-text">
            خوش آمدید! به مسیر یادگیری خود ادامه دهید.
          </p>


          {message && (
            <p className="profile-success-message">
              {message}
            </p>
          )}


          {error && (
            <p className="profile-error-message">
              {error}
            </p>
          )}

        </div>

      </div>

      <div className="profile-edit-actions">

        <button
          type="button"
          className="edit-btn"
          disabled={savingProfile}
          onClick={handleEditButtonClick}
        >
          {savingProfile
            ? "در حال ذخیره..."
            : isEditing
              ? "ذخیره پروفایل"
              : "ویرایش پروفایل"
          }
        </button>


        {isEditing && (
          <button
            type="button"
            className="cancel-edit-btn"
            onClick={() => {
              setIsEditing(false);
              fetchProfile();
            }}
          >
            لغو
          </button>
        )}

      </div>

    </div>
  );
};


export default ProfileSection;