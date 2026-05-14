import { ToDo } from "~/todo/todo";

export function meta() {
  return [
    { title: "To Do" },
    { name: "description", content: "A simple todo list page" },
  ];
}

export default function TodoRoute() {
  return <ToDo />;
}