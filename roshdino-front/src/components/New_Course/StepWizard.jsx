import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import StepSkills from "./StepSkills";
import StepSubSkills from "./StepSubSkills";
import StepDuration from "./StepDuration";
import StepLevel from "./StepLevel";
import StepAccess from "./StepAccess";
import StepFilter from "./StepFilter";
import SuggestedCourse from "./SuggestedCourse";

import { recommendCourse, addCourse } from "./api";

import "./form_style.css";

const initialState = {
  skill: null,        // { id, name }
  subskill: null,     // { id, name }
  duration: "",       // short | medium | long | too long
  level: "",          // beginner | intermediate | advanced
  isFree: null,       // true | false
  resourceType: "",   // video | article | course | podcast
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_SKILL":
      return {
        ...state,
        skill: action.payload,
        subskill: null,
      };

    case "SET_SUBSKILL":
      return {
        ...state,
        subskill: action.payload,
      };

    case "SET_DURATION":
      return {
        ...state,
        duration: action.payload,
      };

    case "SET_LEVEL":
      return {
        ...state,
        level: action.payload,
      };

    case "SET_ACCESS":
      return {
        ...state,
        isFree: action.payload,
      };

    case "SET_RESOURCE_TYPE":
      return {
        ...state,
        resourceType: action.payload,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

const StepWizard = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(1);

  const [suggestedCourse, setSuggestedCourse] = useState(null);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendError, setRecommendError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const goToSuggestedCourse = async (resourceTypeFromStep) => {
    const finalState = {
      ...formState,
      resourceType: resourceTypeFromStep || formState.resourceType,
    };

    if (
      !finalState.skill ||
      !finalState.subskill ||
      !finalState.duration ||
      !finalState.level ||
      finalState.isFree === null ||
      !finalState.resourceType
    ) {
      alert("لطفاً همه مراحل فرم را کامل کنید.");
      return;
    }

    const payload = {
      skill: finalState.skill.id,
      subskill: finalState.subskill.id,
      level: finalState.level,
      is_free: finalState.isFree,
      duration_minutes: finalState.duration,
      resource_type: finalState.resourceType,
    };

    setStep(7);
    setSuggestedCourse(null);
    setRecommendError("");
    setRecommendLoading(true);

    try {
      const course = await recommendCourse(payload);
      setSuggestedCourse(course);
    } catch (error) {
      if (error.response?.status === 404) {
        setRecommendError("دوره‌ای با این فیلترها یافت نشد.");
      } else if (error.response?.status === 400) {
        setRecommendError("اطلاعات فرم معتبر نیست. لطفاً گزینه‌ها را دوباره بررسی کنید.");
      } else if (error.response?.status === 401) {
        setRecommendError("برای دریافت دوره باید وارد حساب کاربری شوید ");
      } else {
        setRecommendError("خطایی در ارتباط با سرور رخ داد.");
      }
    } finally {
      setRecommendLoading(false);
    }
  };

  const handleConfirmCourse = async () => {
    if (!suggestedCourse?.id) return;

    setAddLoading(true);

    try {
      await addCourse(suggestedCourse.id);

      dispatch({ type: "RESET_FORM" });
      navigate("/dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("برای اضافه کردن دوره باید وارد حساب کاربری شوید.");
      } else {
        alert("دوره پیدا شد، ولی در اضافه کردن آن به لیست شما خطا رخ داد.");
      }
    } finally {
      setAddLoading(false);
    }
  };

  const handleCancelCourse = () => {
    setStep(6);
  };

  return (
    <div className="card">
      {step === 1 && (
        <StepSkills
          dispatch={dispatch}
          nextStep={nextStep}
          selectedSkill={formState.skill}
        />
      )}

      {step === 2 && (
        <StepSubSkills
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selectedSkill={formState.skill}
          selectedSubSkill={formState.subskill}
        />
      )}

      {step === 3 && (
        <StepDuration
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.duration}
        />
      )}

      {step === 4 && (
        <StepLevel
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.level}
        />
      )}

      {step === 5 && (
        <StepAccess
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.isFree}
        />
      )}

      {step === 6 && (
        <StepFilter
          dispatch={dispatch}
          prevStep={prevStep}
          selected={formState.resourceType}
          handleSubmit={goToSuggestedCourse}
        />
      )}

      {step === 7 && (
        <SuggestedCourse
          course={suggestedCourse}
          loading={recommendLoading}
          error={recommendError}
          addLoading={addLoading}
          onCancel={handleCancelCourse}
          onConfirm={handleConfirmCourse}
        />
      )}
    </div>
  );
};

export default StepWizard;