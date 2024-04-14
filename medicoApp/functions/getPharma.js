import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import DB from "../firebase-config";

const [pharmacies, setPharmacies] = useState([]);

const pharmaciesCollectionRef = collection(DB, "pharmacy");

export const getPharmacies = () => {
  const unsubscribe = onSnapshot(pharmaciesCollectionRef, (snapshot) => {
    const newPharmacies = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPharmacies(newPharmacies);
    console.log("this is pharmacies", newPharmacies);
  }, (error) => {
    console.error("Error fetching data:", error);
  });

  // Clean up the listener on unmount
  return unsubscribe;
};

useEffect(() => {
  const unsubscribe = getPharmacies();
  return () => unsubscribe();
}, []);