import { useState } from "react";
import useLocalStorage from "~/userForm/useLocalStorage";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

type CartItem = Product & {
  quantity: number;
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", category: "electronics", price: 999, inStock: true },
  { id: 2, name: "Shirt", category: "clothing", price: 29, inStock: false },
  { id: 3, name: "Phone", category: "electronics", price: 599, inStock: true },
];

export default function EcommerceChallenge() {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showInStock, setShowInStock] = useState(false);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (showInStock && !p.inStock) return false;
    return true;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="shopping-layout">
      <section className="product-list">
        <div className="filter-controls">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showInStock}
              onChange={(e) => setShowInStock(e.target.checked)}
            />{' '}
            In stock only
          </label>
        </div>

        {filteredProducts.map((p) => (
          <div key={p.id} className="product-item">
            {p.name} — ${p.price}
            <button onClick={() => addToCart(p)} disabled={!p.inStock}>
              Add to cart
            </button>
          </div>
        ))}
      </section>

      <aside className="cart-sidebar">
        <h3>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <span>
              {item.name} x{item.quantity}
            </span>
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
        ))}
      </aside>
    </div>
  );
}
