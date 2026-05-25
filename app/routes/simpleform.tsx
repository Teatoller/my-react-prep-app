import { SimpleForm } from "~/userForm/simpleform";

export function meta() {
  return [
    { title: "Simple form" },
    { name: "description", content: "A simple user form" },
  ];
}

export default function SimpleFormRoute() {
  return <SimpleForm />;
}