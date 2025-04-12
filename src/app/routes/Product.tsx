import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useAuth from "../../contexts/auth/useAuth";
import { useNavigate } from "react-router";

export default function Product() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", calories: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRef = collection(db, "products");
        const snapshot = await getDocs(productRef);
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.calories <= 0) return;

    try {
      const productRef = collection(db, "products");
      await addDoc(productRef, newProduct);
      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({ name: "", calories: 0 });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddCalories = async (productId: string, calories: number) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        calories: increment(calories),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding calories:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Page</h1>
      <form onSubmit={handleAddProduct} className="mb-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Calories"
          value={newProduct.calories}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              calories: parseInt(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Product
        </button>
      </form>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">
                Calories: {product.calories}
              </p>
            </div>
            <button
              onClick={() => handleAddCalories(product.id, product.calories)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}