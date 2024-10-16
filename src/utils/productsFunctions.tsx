import IProduct from "@/Interfaces/iProduct";

export function CountProducts(productsMap: Map<IProduct, number>): number {
  let count: number = 0;
  for (const value of productsMap.values()) {
    count += value;
  }
  return count;
}
export function TotalPrice(productsMap: Map<IProduct, number>): number {
  let totalPrice: number = 0;
  for (const [key, value] of productsMap.entries()) {
    totalPrice += key.price * value;
  }
  return totalPrice;
}
