"use client";
import styles from "./page.module.css";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent";

import React, { useState } from "react";
import IProduct from "@/Interfaces/iProduct";

import { getData } from "@/server/actions";

export default async function Home() {
  const [cartProducts, setCartProduct] = useState<Map<IProduct, number>>(
    new Map()
  );

  const setToCart = (key: IProduct, value: number) => {
    setCartProduct((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);
      return newMap;
    });
  };
  const removeFromCart = (key: IProduct) => {
    setCartProduct((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };
  const CartObject = {
    cartProducts,
    setToCart,
    removeFromCart,
  };

  const products: IProduct[] = getData();

  return (
    <main className={styles.page}>
      <section className={styles.desertsSection}>
        <h1>Desserts</h1>
        <div className={styles.productContainer}>
          <ul>
            {products.map((product: IProduct, index: number) => (
              <ProductCardComponent
                key={index}
                product={product}
                CartObject={CartObject}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
