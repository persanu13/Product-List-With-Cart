"use client";
import React from "react";

import IProduct from "@/Interfaces/iProduct";

type Props = {
  product: IProduct;
  CartObject: {
    cartProducts: Map<IProduct, number>;
    setToCart: (key: IProduct, value: number) => void;
    removeFromCart: (key: IProduct) => void;
  };
};

export default function ProductCardComponent({ product, CartObject }: Props) {
  return (
    <div>
      <h1>{product.name}</h1>
      <button
        onClick={() => {
          CartObject.setToCart(product, 1);
        }}
      >
        Press Me
      </button>
      {CartObject.cartProducts.has(product)
        ? CartObject.cartProducts.get(product)
        : 0}
    </div>
  );
}
