import { useState, useMemo, useCallback } from "react";
import { mockProducts } from "../../data/products.js";
import ProductSearchBar from "../components/ProductSearchBar";
import ProductList from "../components/ProductList";
import styles from "./ProductsPage.module.css";

function applyDiscount(product) {
  const discount = (product.id % 7) / 20; // deterministic fake discount, 0-30%
  return {
    ...product,
    discountedPrice: Number((product.price * (1 - discount)).toFixed(2)),
  };
}

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  //   slow so commented
  //   const handleSearchChange = (value) => {
  //     setSearch(value);
  //   };
  // useCallback: stable function reference across renders
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []); // no dependencies, setSearch is stable from useState

  // This computation runs on every render, even when cartCount changes
  // Slow
  //   const filteredProducts = mockProducts
  //     .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  //     .map(applyDiscount);

  // useMemo: only recompute when search changes
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .map(applyDiscount);
  }, [search]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Products</h1>
        <div className={styles.cart}>
          <p>
            Cart: <strong>{cartCount}</strong>
          </p>
          <button onClick={() => setCartCount((c) => c + 1)}>
            Add Random Item
          </button>
          <span className={styles.hint}>
            (this should not affect the product list below)
          </span>
        </div>
      </div>

      <ProductSearchBar value={search} onChange={handleSearchChange} />
      <p className={styles.count}>
        Showing <strong>{filteredProducts.length}</strong> products
      </p>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default ProductsPage;
