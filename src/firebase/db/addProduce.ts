import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Function to add a new product to the Firestore database.
 * @param product - The product object containing its details.
 * @returns A promise that resolves with the added product's document reference.
 */
export const addProduce = async (product: {
  name: string;
  calories: number;
  fat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  salt: number;
  fiber: number;
}) => {
  try {
    const productRef = collection(db, "products");
    const docRef = await addDoc(productRef, product);
    return docRef;
  } catch (error) {
    throw new Error(`Error adding product: ${error}`);
  }
};