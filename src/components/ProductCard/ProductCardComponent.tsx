"use client";
import React from "react";
import styles from "./productCard.module.css";

import Image from "next/image";
import IProduct from "@/Interfaces/iProduct";
import { useGlobalContext } from "@/app/myContext";

type Props = {
  product: IProduct;
};

export default function ProductCardComponent({ product }: Props) {
  const { cartData, setValue, deleteKey } = useGlobalContext();

  const pressAdd = () => {
    setValue(product, 1);
  };

  const increment = () => {
    setValue(product, cartData.get(product)! + 1);
  };
  const decrement = () => {
    if (cartData.get(product) == 1) {
      deleteKey(product);
      return;
    }
    setValue(product, cartData.get(product)! - 1);
  };

  return (
    <div className={styles.card}>
      <picture className={styles.imgContainer}>
        <source media="(max-width: 512px)" srcSet={product.image.mobile} />
        <source media="(max-width: 1024px)" srcSet={product.image.tablet} />
        <Image
          style={
            cartData.has(product)
              ? { outline: "solid 2.5px var(--color-red)" }
              : {}
          }
          className={styles.image}
          src={product.image.desktop}
          alt={`product image ${product.name}`}
          width={320}
          height={320}
        />
        {cartData.has(product) ? (
          <div className={styles.addContainer}>
            <button onClick={decrement}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="2"
                fill="none"
                viewBox="0 0 10 2"
              >
                <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            {cartData.get(product)}
            <button onClick={increment}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#fff"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button className={styles.addButton} onClick={pressAdd}>
            <Image
              src="/assets/images/icon-add-to-cart.svg"
              alt="add to cart icon"
              width={21}
              height={20}
            />
            Add to Cart
          </button>
        )}
      </picture>

      <p>{product.category}</p>
      <h1>{product.name}</h1>
      <h2>${product.price.toFixed(2)}</h2>
    </div>
  );
}
