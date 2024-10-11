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
  const { data, setValue } = useGlobalContext();
  return (
    <div className={styles.card}>
      <picture className={styles.imgContainer}>
        <source media="(max-width: 512px)" srcSet={product.image.mobile} />
        <source media="(max-width: 1024px)" srcSet={product.image.tablet} />
        <Image
          className={styles.image}
          src={product.image.desktop}
          alt={`product image ${product.name}`}
          width={320}
          height={320}
        />
      </picture>
      <p>{product.category}</p>
      <h1>{product.name}</h1>
      <h2>${product.price.toFixed(2)}</h2>
      <button
        onClick={() => {
          setValue(product, data.get(product) ? data.get(product)! + 1 : 1);
        }}
      >
        {data.get(product)}
      </button>
    </div>
  );
}
