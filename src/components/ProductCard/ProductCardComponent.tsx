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
  const { cartData, setValue, deleteValue } = useGlobalContext();

  const pressAdd = () => {
    setValue(product, 1);
  };

  const increment = () => {
    setValue(product, cartData.get(product)! + 1);
  };
  const decrement = () => {
    if (cartData.get(product) == 1) {
      deleteValue(product);
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
              <Image
                src="/assets/images/icon-decrement-quantity.svg"
                alt="deccrement button icon"
                width={10}
                height={2}
              />
            </button>
            {cartData.get(product)}
            <button onClick={increment}>
              <Image
                src="/assets/images/icon-increment-quantity.svg"
                alt="increment button icon"
                width={10}
                height={10}
              />
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
