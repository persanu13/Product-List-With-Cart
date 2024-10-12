"use client";
import React from "react";
import styles from "./productsCart.module.css";
import Image from "next/image";

import { useGlobalContext } from "@/app/myContext";

export default function ProductsCartComponent() {
  const { cartData, setValue, deleteValue } = useGlobalContext();
  const CountProducts = (): number => {
    let count: number = 0;
    for (const value of cartData.values()) {
      count += value;
    }
    return count;
  };

  const emptyCart = () => {
    return (
      <>
        <Image
          src="assets\images\illustration-empty-cart.svg"
          alt="empty products cart"
          width={128}
          height={128}
        />
        <p>Your added items will appear here</p>
      </>
    );
  };

  const productsCart = () => {
    return (
      <>
        <ul>
          {Array.from(cartData).map(([key, value], index) => (
            <li key={index}>
              {key.name}: {value}
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Your Cart ({CountProducts()})</h1>
      {CountProducts() == 0 ? emptyCart() : productsCart()}
    </div>
  );
}
