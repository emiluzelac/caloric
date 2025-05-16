import React, { useState } from "react";

const Calculator: React.FC = () => {
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [selectedActivityLevel, setSelectedActivityLevel] = useState("");
  const [rmr, setRmr] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [weightLoss, setWeightLoss] = useState("");
  const [weightGain, setWeightGain] = useState("");
  const [bmi, setBmi] = useState("");
  const [ffm, setFfm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const calculate = () => {
    if (sex && age && heightFt && heightIn && weightLbs) {
      const heightCm = (parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54;
      const weightKg = parseFloat(weightLbs) * 0.453592;

      // Estimate FFM
      let estimatedFFM = 0;
      if (sex === "male") {
        estimatedFFM = 0.407 * weightKg + 0.267 * heightCm - 19.2;
      } else {
        estimatedFFM = 0.252 * weightKg + 0.473 * heightCm - 48.3;
      }

      // Calculate REE (RMR)
      let ree = 0;
      if (sex === "male") {
        ree = 23.69 * estimatedFFM + 372.7;
      } else {
        ree = 21.6 * estimatedFFM + 371.2;
      }

      const activityMultiplier = parseFloat(activityLevel);
      const tdee = ree * activityMultiplier;

      setFfm(estimatedFFM.toFixed(1));
      setRmr(ree.toFixed(0));
      setMaintenance(tdee.toFixed(0));
      setWeightLoss((tdee - 500).toFixed(0));
      setWeightGain((tdee + 500).toFixed(0));
      setBmi(calculateBMI());
      setShowResults(true);
    }

    setFormSubmitted(true);
  };

  const calculateBMI = () => {
    const heightM =
      ((parseInt(heightFt) * 12 + parseInt(heightIn)) * 2.54) / 100;
    const weightKg = parseFloat(weightLbs) * 0.453592;
    const bmi = (weightKg / (heightM * heightM)).toFixed(2);
    return bmi;
  };

  const getActivityLevelName = (value: string) => {
    switch (value) {
      case "1.2":
        return "sedentary";
      case "1.375":
        return "lightly active";
      case "1.55":
        return "moderately active";
      case "1.725":
        return "very active";
      case "1.9":
        return "extra active";
      default:
        return "sedentary";
    }
  };

  const getBMIStatusColor = () => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return "linear-gradient(to right, #007bff, #28a745)";
    if (bmiValue < 25) return "linear-gradient(to right, #28a745, #ffc107)";
    if (bmiValue < 30) return "linear-gradient(to right, #ffc107, #dc3545)";
    return "linear-gradient(to right, #dc3545, #9c27b0)";
  };

  const isInvalid = (value: string) => {
    return formSubmitted && (!value || value.trim() === "");
  };

  const resetCalculator = () => {
    setSex("");
    setAge("");
    setHeightFt("");
    setHeightIn("");
    setWeightLbs("");
    setActivityLevel("1.2");
    setSelectedActivityLevel("");
    setRmr("");
    setMaintenance("");
    setWeightLoss("");
    setWeightGain("");
    setFfm("");
    setBmi("");
    setShowResults(false);
    setFormSubmitted(false);
  };

  return (
    <>
      <div
        id="formSection"
        className="p-4 p-md-5 mb-4 card"
        style={{ display: showResults ? "none" : "block" }}
      >
        <h2 className="fs-3">Calorie Calculator</h2>
        <p>
          This calculator uses estimated lean mass for a more accurate metabolic
          rate.
        </p>

        <div className="form-floating mb-3">
          <select
            id="sex"
            className={`form-select ${isInvalid(sex) ? "is-invalid" : ""}`}
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
            className={`form-control ${isInvalid(age) ? "is-invalid" : ""}`}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
          />
          <label htmlFor="age">Age</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            id="heightFt"
            className={`form-control ${isInvalid(heightFt) ? "is-invalid" : ""
              }`}
            value={heightFt}
            onChange={(e) => setHeightFt(e.target.value)}
            placeholder="Height (ft)"
            required
          />
          <label htmlFor="heightFt">Height (ft)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            id="heightIn"
            className={`form-control ${isInvalid(heightIn) ? "is-invalid" : ""
              }`}
            value={heightIn}
            onChange={(e) => setHeightIn(e.target.value)}
            placeholder="Height (in)"
            required
          />
          <label htmlFor="heightIn">Height (in)</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="number"
            id="weightLbs"
            className={`form-control ${isInvalid(weightLbs) ? "is-invalid" : ""
              }`}
            value={weightLbs}
            onChange={(e) => setWeightLbs(e.target.value)}
            placeholder="Weight (lbs)"
            required
          />
          <label htmlFor="weightLbs">Weight (lbs)</label>
        </div>

        <h3 className="fs-5">Activity Level</h3>
        {[
          { value: "1.2", label: "Sedentary (little or no exercise)" },
          { value: "1.375", label: "Lightly active (1–3 days/week)" },
          { value: "1.55", label: "Moderately active (3–5 days/week)" },
          { value: "1.725", label: "Very active (6–7 days/week)" },
          { value: "1.9", label: "Extra active (physical job or 2x training)" },
        ].map((opt) => (
          <div className="form-check" key={opt.value}>
            <input
              type="radio"
              id={opt.value}
              name="activityLevel"
              value={opt.value}
              checked={activityLevel === opt.value}
              onChange={() => {
                setActivityLevel(opt.value);
                setSelectedActivityLevel(opt.value);
              }}
              className="form-check-input"
            />
            <label htmlFor={opt.value} className="form-check-label">
              {opt.label}
            </label>
          </div>
        ))}

        <button className="btn btn-primary w-100 my-4 py-2" onClick={calculate}>
          Calculate
        </button>
      </div>

      {showResults && (
        <div id="resultsSection" className="my-5">
          <button className="btn btn-light my-4 py-1" onClick={resetCalculator}>
            Start Over
          </button>

          <p className="lead">
            Your results for{" "}
            <strong>{getActivityLevelName(selectedActivityLevel)}</strong>{" "}
            activity level:
          </p>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {[
              {
                title: "RMR",
                value: rmr,
                desc: "Calories to maintain basic body functions at rest.",
                foot: "Resting Metabolic Rate",
              },
              {
                title: "Maintenance",
                value: maintenance,
                desc: "Calories to maintain current weight.",
                foot: "Caloric Balance",
              },
              {
                title: "Weight Loss",
                value: weightLoss,
                desc: "Calories to promote weight loss.",
                foot: "Caloric Deficit",
              },
              {
                title: "Weight Gain",
                value: weightGain,
                desc: "Calories to support weight gain.",
                foot: "Caloric Surplus",
              },
              {
                title: "Lean Mass",
                value: ffm + " kg",
                desc: "Estimated fat-free body mass.",
                foot: "Fat-Free Mass (FFM)",
              },
            ].map(({ title, value, desc, foot }) => (
              <div className="col" key={title}>
                <div className="card h-100">
                  <div className="card-header">
                    <h4>{title}</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title">
                      {value}
                      <small className="fw-light">
                        {title !== "Lean Mass" ? " /day" : ""}
                      </small>
                    </h1>
                    <p className="card-text">{desc}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">{foot}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title">BMI Score</h2>
              <p className="card-text">Your Body Mass Index (BMI) is {bmi}</p>
              <span className="text-muted">
                BMI = weight (kg) / height (m)²
              </span>
              <div className="progress my-3">
                <div
                  className="progress-bar"
                  style={{
                    background: getBMIStatusColor(),
                    width: `${parseFloat(bmi) * (100 / 30)}%`,
                    transition: "width 0.5s",
                  }}
                  role="progressbar"
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className="badge text-bg-primary">Underweight</span>
                <span className="badge text-bg-success">Normal</span>
                <span className="badge text-bg-warning">Overweight</span>
                <span className="badge text-bg-danger">Obesity</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
