import React, { useEffect, useState } from "react";
import OptionGrid from "./OptionGrid";
import { fetchSkills } from "./api";

const StepSkills = ({ dispatch, nextStep, selectedSkill }) => {
  const [skills, setSkills] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedSkill?.name || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSkills = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchSkills();

        if (isMounted) {
          setSkills(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("خطا در دریافت فهرست مهارت‌ها از سرور.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  const skillOptions = skills.map((skill) => ({
    name: skill.name,
    icon: skill.image_url,
  }));

  const handleNext = () => {
    const selectedSkillObject = skills.find((skill) => skill.name === currentSelection);

    if (!selectedSkillObject) {
      alert("لطفاً یک مهارت انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_SKILL",
      payload: {
        id: selectedSkillObject.id,
        name: selectedSkillObject.name,
      },
    });

    nextStep();
  };

  return (
    <>
      <h2>فهرست مهارت‌ها</h2>
      <div className="divider"></div>

      {loading && <p className="form-message">در حال دریافت مهارت‌ها...</p>}

      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <OptionGrid
          options={skillOptions}
          selected={currentSelection}
          setSelected={setCurrentSelection}
          columns={4}
        />
      )}

      <div className="button-row">
        <button className="button" onClick={handleNext} disabled={loading}>
          ادامه
        </button>
      </div>
    </>
  );
};

export default StepSkills;