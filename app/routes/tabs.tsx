import { Tabs } from "~/tabscomponent/tabs";

export function meta() {
  return [
    { title: "Tabs" },
    { name: "description", content: "A simple tabs page" },
  ];
}

export default function TabsRoute() {
  return <Tabs />;
}