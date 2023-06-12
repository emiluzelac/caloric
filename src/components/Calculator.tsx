import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');
  const [rmr, setRmr] = useState('');
  const [maintenance, setMaintenance] = useState('');
  const [weightLoss, setWeightLoss] = useState('');
  const [weightGain, setWeightGain] = useState('');
  const [bmi, setBmi] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculate = () => {
    if (sex && age && heightFt && heightIn && weightLbs) {
      const heightCm = (parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54;
      const weightKg = parseFloat(weightLbs) * 0.453592;

      let pavlidouResult;

      if (sex === 'male') {
        pavlidouResult =
          9.65 * weightKg + 573 * (heightCm / 100) - 5.08 * parseInt(age) + 260;
      } else {
        pavlidouResult =
          7.38 * weightKg + 607 * (heightCm / 100) - 2.31 * parseInt(age) + 43;
      }

      const caloricIntakeResult = pavlidouResult * parseFloat(activityLevel);

      const rmrResult = pavlidouResult.toFixed(0);
      const maintenanceResult = caloricIntakeResult.toFixed(0);
      const weightLossResult = (caloricIntakeResult - 500).toFixed(0);
      const weightGainResult = (caloricIntakeResult + 500).toFixed(0);

      setRmr(rmrResult);
      setMaintenance(maintenanceResult);
      setWeightLoss(weightLossResult);
      setWeightGain(weightGainResult);
      setBmi(calculateBMI());
      setShowResults(true);
    }
    setFormSubmitted(true);
  };

  const isInvalid = (value: string) => {
    return formSubmitted && (!value || value.trim() === '');
  };

  const getActivityLevelName = (value: string) => {
    switch (value) {
      case '1.2':
        return 'sedentary';
      case '1.375':
        return 'lightly active';
      case '1.55':
        return 'moderately active';
      case '1.725':
        return 'very active';
      case '1.9':
        return 'extra active';
      default:
        return 'sedentary';
    }
  };

  const calculateBMI = () => {
    const heightM =
      ((parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54) / 100;
    const weightKg = parseFloat(weightLbs) * 0.453592;
    const bmi = (weightKg / (heightM * heightM)).toFixed(2);
    return bmi;
  };

  const resetCalculator = () => {
    setSex('');
    setAge('');
    setHeightFt('');
    setHeightIn('');
    setWeightLbs('');
    setActivityLevel('1.2');
    setSelectedActivityLevel('');
    setRmr('');
    setMaintenance('');
    setWeightLoss('');
    setWeightGain('');
    setBmi('');
    setShowResults(false);
    setFormSubmitted(false);
  };

  const getBMIStatusColor = () => {
    const bmiValue = parseFloat(bmi);
    let gradientColor;

    if (bmiValue < 18.5) {
      gradientColor = 'linear-gradient(to right, #007bff, #28a745)';
    } else if (bmiValue < 25) {
      gradientColor = 'linear-gradient(to right, #28a745, #ffc107)';
    } else if (bmiValue < 30) {
      gradientColor = 'linear-gradient(to right, #ffc107, #dc3545)';
    } else {
      gradientColor = 'linear-gradient(to right, #dc3545, #9c27b0)';
    }

    return gradientColor;
  };

  return (
    <>
      <div
        id="formSection"
        className="my-4"
        style={{ display: showResults ? 'none' : 'block' }}
      >
        <h1 className="h1 mb-3 fw-normal">Calorie Calculator</h1>
        <p>
          This TDEE calorie calculator improves the Harris-Benedict equations by
          creating and validating new equations to estimate resting metabolic
          rate (RMR) in adults of various weights using the same anthropometric
          factors.
        </p>
        <div className='card'>
        <div className='card-body'>
        <div className="form-floating mb-3">
          <select
            id="sex"
            className={`form-select ${isInvalid(sex) ? 'is-invalid' : ''}`}
            aria-label="Select"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label htmlFor="sex">Gender</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            id="age"
            className={`form-control ${isInvalid(age) ? 'is-invalid' : ''}`}
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            pattern="[0-9]*"
            required
          />
          <label htmlFor="age">Age</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            id="heightFt"
            className={`form-control ${
              isInvalid(heightFt) ? 'is-invalid' : ''
            }`}
            placeholder="Height (ft)"
            value={heightFt}
            onChange={(e) => setHeightFt(e.target.value)}
            pattern="[0-9]*"
            required
          />
          <label htmlFor="heightFt">Height (ft)</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            id="heightIn"
            className={`form-control ${
              isInvalid(heightIn) ? 'is-invalid' : ''
            }`}
            placeholder="Height (in)"
            value={heightIn}
            onChange={(e) => setHeightIn(e.target.value)}
            pattern="[0-9]*"
            required
          />
          <label htmlFor="heightIn">Height (in)</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            id="weightLbs"
            className={`form-control ${
              isInvalid(weightLbs) ? 'is-invalid' : ''
            }`}
            placeholder="Weight (lbs)"
            value={weightLbs}
            onChange={(e) => setWeightLbs(e.target.value)}
            pattern="[0-9]*"
            required
          />
          <label htmlFor="weightLbs">Weight (lbs)</label>
        </div>
        </div>
  
        <div className="card-footer my-5">
          <h2 className="h2 mb-3 fw-normal text-dark">Activity Level</h2>
          {[
            { value: '1.2', label: 'Sedentary (little or no exercise)' },
            {
              value: '1.375',
              label: 'Lightly active (light exercise/sports 1-3 days/week)',
            },
            {
              value: '1.55',
              label:
                'Moderately active (moderate exercise/sports 3-5 days/week)',
            },
            {
              value: '1.725',
              label: 'Very active (hard exercise/sports 6-7 days a week)',
            },
            {
              value: '1.9',
              label:
                'Extra active (very hard exercise/sports & physical job or 2x training)',
            },
          ].map((option) => (
            <div className="form-check" key={option.value}>
              <input
                type="radio"
                id={option.value}
                name="activityLevel"
                value={option.value}
                checked={activityLevel === option.value}
                onChange={() => {
                  setActivityLevel(option.value);
                  setSelectedActivityLevel(option.value);
                }}
                className="form-check-input"
                required
              />
              <label htmlFor={option.value} className="form-check-label">
                {option.label}
              </label>
            </div>
          ))}
        </div>
        </div>
        <button className="w-100 btn btn-primary btn-lg" onClick={calculate}>
          Calculate
        </button>
      </div>
      {showResults && (
        <div id="resultsSection" className="my-5">
          <button
            className="btn btn-sm btn-gray-500 d-inline-flex align-items-center py-1 ps-3 text-start"
            onClick={resetCalculator}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-xxs text-dark me-2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
              <path d="M5.63 7.16l0 .01"></path>
              <path d="M4.06 11l0 .01"></path>
              <path d="M4.63 15.1l0 .01"></path>
              <path d="M7.16 18.37l0 .01"></path>
              <path d="M11 19.94l0 .01"></path>
            </svg>
            Start Over
          </button>
          <div className="mb-3">
            <h1>Results</h1>
            <p className="lead">
              Your results for {getActivityLevelName(selectedActivityLevel)}{' '}
              activity level:
            </p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">RMR</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    {rmr}
                    <small className="fw-light"> /day</small>
                  </h1>
                  <p className="card-text">
                    Number of daily calories required to maintain your body's
                    basic functions at rest.
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Resting Metabolic Rate
                  </small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">Maintenance</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    {maintenance}
                    <small className="fw-light"> /day</small>
                  </h1>
                  <p className="card-text">
                    Number of daily calories that will enable you to maintain
                    your current weight.
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Caloric Balance</small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">Weight Loss</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    {weightLoss}
                    <small className="fw-light"> /day</small>
                  </h1>
                  <p className="card-text">
                    Number of daily calories to consume for weight loss.
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Caloric Deficit</small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="my-0 fw-normal">Weight Gain</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title">
                    {weightGain}
                    <small className="fw-light"> /day</small>
                  </h1>
                  <p className="card-text">
                    Number of daily calories to consume for weight gain.
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Caloric Surplus</small>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <h2>BMI Calculation</h2>
            <p>Your Body Mass Index (BMI) is {bmi}.</p>
            <span className="text-muted">
              BMI = weight (kg) / (height (m))^2
            </span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="BMI"
                aria-valuenow={parseFloat(bmi)}
                aria-valuemin={0}
                aria-valuemax={30}
                style={{
                  background: getBMIStatusColor(),
                  width: `${parseFloat(bmi) * (100 / 30)}%`,
                  transition: 'width 0.5s, background-color 0.5s',
                }}
              >
                <span className="sr-only">{parseFloat(bmi)}%</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span
                className={parseFloat(bmi) < 18.5 ? 'text-primary fw-bold' : ''}
              >
                Underweight
              </span>
              <span
                className={
                  parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25
                    ? 'text-success fw-bold'
                    : ''
                }
              >
                Normal
              </span>
              <span
                className={
                  parseFloat(bmi) >= 25 && parseFloat(bmi) < 30
                    ? 'text-warning fw-bold'
                    : ''
                }
              >
                Overweight
              </span>
              <span
                className={parseFloat(bmi) >= 30 ? 'text-danger fw-bold' : ''}
              >
                Obesity
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
