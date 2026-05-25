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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-medium ${step === 1 ? 'text-indigo-600' : 'text-gray-500'}`}>
              Step 1: Personal Info
            </span>
            <span className={`text-sm font-medium ${step === 2 ? 'text-indigo-600' : 'text-gray-500'}`}>
              Step 2: Address
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300 ease-in-out rounded-full"
              style={{ width: step === 1 ? '50%' : '100%' }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400
                    ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400
                    ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {errors.email}
                  </p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400
                  ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                  {errors.address}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              ← Back
            </button>
          )}
          
          {step < 2 && (
            <button
              onClick={nextStep}
              className="flex-1 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              Next →
            </button>
          )}
          
          {step === 2 && (
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
              ✓ Submit
            </button>
          )}
        </div>

        {/* Form Data Preview (optional) */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Your progress is automatically saved
          </p>
        </div>
      </div>
    </div>
  );
}