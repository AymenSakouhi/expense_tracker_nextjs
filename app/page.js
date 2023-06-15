"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  //Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" || newItem.price !== "") {
      setItems([...items, newItem]);
    }
    await addDoc(collection(db, "items"), {
      name: newItem.name.trim(),
      price: newItem.price.trim(),
    });
    setNewItem({ name: "", price: "" });
  };

  //Read items from database
  //getting data on launch
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemArr = [];
      querySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);
      const calculateTotal = () => {
        const totalPrice = itemArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

  //Delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item..."
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $..."
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
              onClick={addItem}
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>$ {item.price}</span>
                </div>
                <button
                  className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16"
                  type="submit"
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {
            <div
              className="flex 
            justify-between
            p-4"
            >
              {total < 1 ? (
                ""
              ) : (
                <>
                  <div>
                    <span>Total</span>
                  </div>
                  <div>
                    <span>$ {total}</span>
                  </div>
                </>
              )}
            </div>
          }
        </div>
      </div>
    </main>
  );
}
