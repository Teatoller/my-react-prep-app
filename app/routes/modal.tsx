import { Modal } from "~/modal/modal";

export function meta() {
  return [
    { title: "Modal" },
    { name: "description", content: "A simple modal page" },
  ];
}

export default function ModalRoute() {
  return <Modal />;
}