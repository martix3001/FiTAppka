import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, increment, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addProduce } from "../../firebase/db/addProduce";
import useAuth from "../../contexts/auth/useAuth";

export default function RegisterProduct() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    sugar: 0,
    protein: 0,
    salt: 0,
    fiber: 0,
  });

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
      await addProduce(newProduct);
      setProducts((prev) => [...prev, newProduct]);
      setNewProduct({
        name: "",
        calories: 0,
        fat: 0,
        carbohydrates: 0,
        sugar: 0,
        protein: 0,
        salt: 0,
        fiber: 0,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleAddCalories = async (calories: number) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        calories: increment(calories),
      });
    } catch (error) {
      console.error("Error adding calories:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register Product Page</h1>
      <form onSubmit={handleAddProduct} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Calories"
          value={newProduct.calories}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              calories: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Fat"
          value={newProduct.fat}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              fat: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Carbohydrates"
          value={newProduct.carbohydrates}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              carbohydrates: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Sugar"
          value={newProduct.sugar}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              sugar: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Protein"
          value={newProduct.protein}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              protein: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Salt"
          value={newProduct.salt}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              salt: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Fiber"
          value={newProduct.fiber}
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              fiber: parseFloat(e.target.value) || 0,
            }))
          }
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full"
        >
          Add Product
        </button>
      </form>
      <div className="overflow-y-scroll h-64 border p-4 rounded">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded shadow flex justify-between items-center mb-2"
          >
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">
                Calories: {product.calories}, Fat: {product.fat}, Carbs:{" "}
                {product.carbohydrates}, Sugar: {product.sugar}, Protein:{" "}
                {product.protein}, Salt: {product.salt}, Fiber: {product.fiber}
              </p>
            </div>
            <button
              onClick={() => handleAddCalories(product.calories)}
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
