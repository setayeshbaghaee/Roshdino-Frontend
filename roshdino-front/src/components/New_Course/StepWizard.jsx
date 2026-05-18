import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StepSkills from './StepSkills';
import StepDuration from './StepDuration';
import StepLevel from './StepLevel';
import StepAccess from './StepAccess';
import StepFilter from './StepFilter';
import SuggestedCourse from './SuggestedCourse';

import "./form_style.css";

const initialState = {
  skill: '',
  duration: '',
  level: '',
  accessType: '',
  filter: [],
};

function reducer(state, action) {
  switch(action.type) {
    case 'SET_SKILL': return { ...state, skill: action.payload };
    case 'SET_DURATION': return { ...state, duration: action.payload };
    case 'SET_LEVEL': return { ...state, level: action.payload };
    case 'SET_ACCESS': return { ...state, accessType: action.payload };
    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'RESET_FORM': return initialState;
    default: return state;
  }
}

const StepWizard = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const goToSuggestedCourse = () => {
    setStep(6);
  };

  const handleConfirmCourse = () => {
    console.log('Final form submitted:', formState);

    dispatch({ type: 'RESET_FORM' });

    navigate('/dashboard'); 
  };

  const handleCancelCourse = () => {
    setStep(5);
  };

  return (
    <div className="card">
      {step === 1 && (
        <StepSkills
          dispatch={dispatch}
          nextStep={nextStep}
          selected={formState.skill}
        />
      )}

      {step === 2 && (
        <StepDuration
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.duration}
        />
      )}

      {step === 3 && (
        <StepLevel
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.level}
        />
      )}

      {step === 4 && (
        <StepAccess
          dispatch={dispatch}
          nextStep={nextStep}
          prevStep={prevStep}
          selected={formState.accessType}
        />
      )}

      {step === 5 && (
        <StepFilter
          dispatch={dispatch}
          prevStep={prevStep}
          formState={formState}
          handleSubmit={goToSuggestedCourse}
        />
      )}

      {step === 6 && (
        <SuggestedCourse
          courseName={formState.skill || "طراحی"}
          onCancel={handleCancelCourse}
          onConfirm={handleConfirmCourse}
        />
      )}
    </div>
  );
};

export default StepWizard;