"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import IProduct from "@/Interfaces/iProduct";

// 2. Definirea tipului pentru context (stare și funcții)
interface GlobalContextType {
  cartData: Map<IProduct, number>;
  setValue: (key: IProduct, value: number) => void;
  deleteKey: (key: IProduct) => void;
  CountProducts: () => number;
  TotalPrice: () => number;
}

// 3. Inițializarea contextului (cu `undefined` la început pentru a obliga folosirea în interiorul provider-ului)
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// 4. Definirea provider-ului
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Map<IProduct, number>>(new Map());

  // Funcția pentru a actualiza valoarea pe baza unei chei
  const setValue = (key: IProduct, value: number) => {
    setData((prevMap) => {
      const newMap = new Map(prevMap); // Creăm o copie a Map-ului curent
      newMap.set(key, value); // Setăm noua valoare pentru cheie
      return newMap; // Returnăm Map-ul actualizat
    });
  };

  // Funcția pentru a reseta toate valorile la zero (sau alte valori implicite)
  const deleteKey = (key: IProduct) => {
    setData((prevMap) => {
      const newMap = new Map(prevMap); // Creăm o copie a Map-ului curent
      newMap.delete(key); // Ștergem cheia specificată
      return newMap; // Returnăm Map-ul actualizat
    });
  };

  //Functia pentru numararea totala a valorilor
  const CountProducts = (): number => {
    let count: number = 0;
    for (const value of data.values()) {
      count += value;
    }
    return count;
  };

  //Functia pentru suma preturilor
  const TotalPrice = (): number => {
    let totalPrice: number = 0;
    for (const [key, value] of data.entries()) {
      totalPrice += key.price * value;
    }
    return totalPrice;
  };

  return (
    <GlobalContext.Provider
      value={{ cartData: data, setValue, deleteKey, CountProducts, TotalPrice }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// 5. Hook personalizat pentru a consuma contextul
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
