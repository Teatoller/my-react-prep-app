// Multi‑filter component (shopping / dashboard)
import { FilterableProductList } from "~/multifilter/producfilter";

export function meta() {
  return [
    { title: "Filterable Product List" },
    { name: "description", content: "A simple filterable product list page" },
  ];
}

let products = [
        { id: 1, name: "Apple", category: "Fruit", price: 5, inStock: true },
        { id: 2, name: "Carrot", category: "Vegetable", price: 8, inStock: false },
        { id: 3, name: "Banana", category: "Fruit", price: 2.0, inStock: true },
        { id: 4, name: "Broccoli", category: "Vegetable", price: 12, inStock: true },
    ];

export default function FilterableProductListRoute() {
  return <FilterableProductList products={products} />;
}