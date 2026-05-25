// Multi-step form with validation + localStorage persistence

import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

type FormData = {
  name: string;
  email: string;
  address: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function MultiStepForm() {
  const [step, setStep] = useLocalStorage<number>("formStep", 1);
  const [formData, setFormData] = useLocalStorage<FormData>("formData", {
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = () => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = "Name required";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email required";
      }
    }

    if (step === 2 && !formData.address) {
      newErrors.address = "Address required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((current: number) => Math.min(current + 1, 2));
    }
  };

  const prevStep = () => {
    setErrors({});
    setStep((current: number) => Math.max(current - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep()) {
      return;
    }

    alert("Submitted: " + JSON.stringify(formData));
    setFormData({ name: "", email: "", address: "" });
    setStep(1);
    setErrors({});
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </>
      )}

      <div>
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < 2 && <button onClick={nextStep}>Next</button>}
        {step === 2 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}