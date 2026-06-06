import React, { useEffect, useState } from "react";
import OptionGrid from "./OptionGrid";
import { fetchSubSkillsBySkill } from "./api";

const StepSubSkills = ({
  dispatch,
  nextStep,
  prevStep,
  selectedSkill,
  selectedSubSkill,
}) => {
  const [subSkills, setSubSkills] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(selectedSubSkill?.name || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSubSkills = async () => {
      if (!selectedSkill?.id) {
        setError("ابتدا باید یک مهارت انتخاب کنید.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await fetchSubSkillsBySkill(selectedSkill.id);

        if (isMounted) {
          setSubSkills(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("خطا در دریافت زیرمهارت‌ها از سرور.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadSubSkills();

    return () => {
      isMounted = false;
    };
  }, [selectedSkill]);

  const subSkillOptions = subSkills.map((subskill) => ({
    name: subskill.name,
    icon: subskill.image_url,
  }));

  const handleNext = () => {
    const selectedSubSkillObject = subSkills.find(
      (subskill) => subskill.name === currentSelection
    );

    if (!selectedSubSkillObject) {
      alert("لطفاً یک زیرمهارت انتخاب کنید.");
      return;
    }

    dispatch({
      type: "SET_SUBSKILL",
      payload: {
        id: selectedSubSkillObject.id,
        name: selectedSubSkillObject.name,
      },
    });

    nextStep();
  };

  return (
    <>
      <h2>انتخاب زیرمهارت</h2>
      <div className="divider"></div>

      {selectedSkill?.name && (
        <p className="form-message">
          مهارت انتخاب‌شده: {selectedSkill.name}
        </p>
      )}

      {loading && <p className="form-message">در حال دریافت زیرمهارت‌ها...</p>}

      {error && <p className="form-error">{error}</p>}

      {!loading && !error && subSkillOptions.length > 0 && (
        <OptionGrid
          options={subSkillOptions}
          selected={currentSelection}
          setSelected={setCurrentSelection}
          columns={4}
        />
      )}

      {!loading && !error && subSkillOptions.length === 0 && (
        <p className="form-message">
          برای این مهارت هنوز زیرمهارتی ثبت نشده است.
        </p>
      )}

      <div className="button-row">
        <button className="button" onClick={prevStep}>
          بازگشت
        </button>

        <button
          className="button"
          onClick={handleNext}
          disabled={loading || subSkillOptions.length === 0}
        >
          ادامه
        </button>
      </div>
    </>
  );
};

export default StepSubSkills;