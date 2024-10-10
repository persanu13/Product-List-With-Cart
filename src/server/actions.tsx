"use server";

const URL: string = "http://localhost:3000/data.json";
import IProduct from "@/Interfaces/iProduct";

export async function getData() {
  const res = await fetch(URL);
  return res.json();
}
