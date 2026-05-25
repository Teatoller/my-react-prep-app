import MultiStepForm from "~/userForm/multistepform";

export function meta() {
  return [
    { title: "Multi-step Form" },
    { name: "description", content: "A multi-step form with validation" },
  ];
}

export default function MultiStepFormRoute() {
  return <MultiStepForm />;
}