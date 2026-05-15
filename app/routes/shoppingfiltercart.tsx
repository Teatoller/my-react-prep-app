import EcommerceChallenge from "~/minimart/shoppingfiltercart";

export function meta() {
  return [
    { title: "Ecommerce Challenge" },
    { name: "description", content: "A simple ecommerce challenge" },
  ];
}

export default function EcommerceChallengeRoute() {
  return <EcommerceChallenge />;
}