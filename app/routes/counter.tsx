import { Counter } from "~/counter/counter";

export function meta() {
  return [
    { title: "Counter" },
    { name: "description", content: "A simple counter page" },
  ];
}

export default function CounterRoute() {
  return <Counter />;
}