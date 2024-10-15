import styles from "./page.module.css";
import ProductCardComponent from "@/components/ProductCard/ProductCardComponent";
import ProductsCartComponent from "@/components/ProductsCart/ProductsCartComponent";

import IProduct from "@/Interfaces/iProduct";

import { GlobalProvider } from "./myContext";

export default async function Home() {
  let data = await fetch("http://localhost:3000/data.json", {
    cache: "no-store",
  });
  let products: IProduct[] = await data.json();
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
