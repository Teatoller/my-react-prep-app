import { useState, useMemo } from "react";

type Product = {
  id: string | number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

type FilterableProductListProps = {
  products: Product[];
};

export function FilterableProductList({ products }: FilterableProductListProps) {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (category && product.category !== category) return false;
      if (product.price < priceRange.min || product.price > priceRange.max) return false;
      if (inStockOnly && !product.inStock) return false;
      return true;
    });
  }, [products, category, priceRange, inStockOnly]);

  return (
    <div>
      <aside style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <div>
          Min Price: <input type="number" onChange={(e) => setPriceRange(prev => ({ ...prev, min: +e.target.value }))} />
          Max Price: <input type="number" onChange={(e) => setPriceRange(prev => ({ ...prev, max: +e.target.value }))} />
        </div>

        <label>
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          In stock only
        </label>
      </aside>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            {p.name} — ${p.price} {!p.inStock && "(Out of stock)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
