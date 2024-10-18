import styles from "./page.module.css";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent";
import ProductsCartComponent from "@/components/ProductsCart/ProductsCartComponent";

import IProduct from "@/Interfaces/iProduct";

import { GlobalProvider } from "./myContext";

export default async function Home() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  let products: IProduct[] = [];
  try {
    const data = await fetch(`${baseURL}/data.json`, {
      cache: "no-store",
    });
    const products: IProduct[] = await data.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <main className={styles.page}>
      <GlobalProvider>
        <section className={styles.desertsSection}>
          <h1>Desserts</h1>
          <div className={styles.productContainer}>
            {products.map((product, index) => (
              <ProductCardComponent key={index} product={product} />
            ))}
          </div>
        </section>
        <ProductsCartComponent />
      </GlobalProvider>
    </main>
  );
}
