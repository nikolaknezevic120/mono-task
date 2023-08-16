import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "mobx-react";
import HomePageLayout from "./Layouts/HomePageLayout";
import AdminPageLayout from "./Layouts/AdminPageLayout";
import CartPageLayout from "./Layouts/CartPageLayout";
import { useProductStore } from "./Stores/ProductStore";

function App() {
  const productStore = useProductStore();
  
  useEffect(() => {
    productStore.fetchProducts();
  }, [productStore]);

  return (
    <Provider productStore={productStore}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePageLayout />} />
          <Route path="/admin" element={<AdminPageLayout />} />
          <Route path="/orderDetails" element={<CartPageLayout />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;



// import React, { useState, useEffect } from "react";
// import { getDatabase, ref, onValue, push, remove, update, set } from "firebase/database";
// import app from "./firebase";

// function App() {
//   const [products, setProducts] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deleteProductId, setDeleteProductId] = useState("");
//   const [deleteError, setDeleteError] = useState(null);
//   const [editProductId, setEditProductId] = useState("");
//   const [newPrice, setNewPrice] = useState("");
//   const [editError, setEditError] = useState(null);
//   const [newProductName, setNewProductName] = useState("");
//   const [newProductDescription, setNewProductDescription] = useState("");
//   const [newProductPrice, setNewProductPrice] = useState("");
//   const [newProductImg, setNewProductImg] = useState("");
//   const [newProductAvailable, setNewProductAvailable] = useState("");
//   const [cart, setCart] = useState({});
//   const [userName, setUserName] = useState("");
//   const [userAddress, setUserAddress] = useState("");

//   useEffect(() => {
//     const db = getDatabase();
//     const productsRef = ref(db, "products");

//     const fetchData = () => {
//       onValue(productsRef, (snapshot) => {
//         const productsData = snapshot.val();
//         if (productsData) {
//           setProducts(productsData);
//           setIsLoading(false);
//         } else {
//           setError("No products found in the database.");
//           setIsLoading(false);
//         }
//       }, (error) => {
//         setError("Error fetching products: " + error.message);
//         setIsLoading(false);
//       });
//     };

//     fetchData();
//   }, []);

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     const db = getDatabase();
//     const productsRef = ref(db, "products");

//     try {
//       await push(productsRef, {
//         name: newProductName,
//         description: newProductDescription,
//         price: parseFloat(newProductPrice),
//         img: newProductImg,
//         available: newProductAvailable,
//       });

//       setNewProductName("");
//       setNewProductDescription("");
//       setNewProductPrice("");
//       setNewProductImg("");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleDeleteProduct = async () => {
//     const db = getDatabase();
//     const productRef = ref(db, `products/${deleteProductId}`);

//     try {
//       await remove(productRef);
//       setDeleteProductId("");
//       setDeleteError(null);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       setDeleteError("Error deleting product: " + error.message);
//     }
//   };

//   const handleEditPrice = async (e) => {
//     e.preventDefault();

//     if (!editProductId || !newPrice) {
//       setEditError("Please enter product ID and new price.");
//       return;
//     }

//     const db = getDatabase();
//     const productRef = ref(db, `products/${editProductId}`);

//     try {
//       await update(productRef, { price: parseFloat(newPrice) });
//       setEditProductId("");
//       setNewPrice("");
//       setEditError(null);
//     } catch (error) {
//       console.error("Error updating price:", error);
//     }
//   };

//   const handleAddToCart = (productId) => {
//     const newCart = { ...cart };

//     if (newCart[productId]) {
//       newCart[productId].quantity += 1;
//     } else {
//       newCart[productId] = {
//         product: products[productId],
//         quantity: 1,
//       };
//     }

//     setCart(newCart);
//   };

  // const handleOrder = async () => {
  //   const db = getDatabase();
  
  //   const userRef = ref(db, "users");
  //   try {
  //     const newUser = await push(userRef, {
  //       name: userName,
  //       address: userAddress,
  //     });
  //     const userId = newUser.key;
  
  //     const productsRef = ref(db, "products");
  //     const updatedProducts = { ...products };
  //     for (const productId in cart) {
  //       const orderedQuantity = cart[productId].quantity;
  
  //       if (updatedProducts[productId].available >= orderedQuantity) {
  //         updatedProducts[productId].available -= orderedQuantity;
  //       } else {
  //         console.error(`Not enough available quantity for product ${productId}`);
  //         return;
  //       }
  //     }
  
  //     await set(productsRef, updatedProducts);
  
  //     const ordersRef = ref(db, "orders");
  //     await push(ordersRef, {
  //       userId,
  //       userName,
  //       userAddress,
  //       cart,
  //       timestamp: new Date().toISOString(),
  //     });
  
  //     setCart({});
  //     setUserName("");
  //     setUserAddress("");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error updating product availability:", error);
  //   }
  // };
  

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>Products:</h1>
//       <ul>
//         {Object.keys(products).map((productId) => (
//           <li key={productId}>
//             <strong>Id:</strong> {productId}<br />
//             <strong>Name:</strong> {products[productId].name}<br />
//             <strong>Description:</strong> {products[productId].description}<br />
//             <strong>Price:</strong> ${products[productId].price}<br />
//             <strong>Available:</strong> {products[productId].available}<br />
//             <img src={products[productId].img} alt={products[productId].name} />
//             <button onClick={() => handleAddToCart(productId)}>Add to cart</button>
//           </li>
//         ))}
//       </ul>

//       <h2>Add New Product:</h2>
//       <form onSubmit={handleAddProduct}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={newProductName}
//             onChange={(e) => setNewProductName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Description:
//           <input
//             type="text"
//             value={newProductDescription}
//             onChange={(e) => setNewProductDescription(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Available:
//           <input
//             type="number"
//             value={newProductAvailable}
//             onChange={(e) => setNewProductAvailable(e.target.value)}
//             step="1"
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Price:
//           <input
//             type="number"
//             value={newProductPrice}
//             onChange={(e) => setNewProductPrice(e.target.value)}
//             step="0.01"
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Image URL:
//           <input
//             type="text"
//             value={newProductImg}
//             onChange={(e) => setNewProductImg(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Add Product</button>
//       </form>

//       <h2>Delete Product:</h2>
//       <form onSubmit={handleDeleteProduct}>
//         {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
//         <label>
//           Product ID:
//           <input
//             type="text"
//             value={deleteProductId}
//             onChange={(e) => setDeleteProductId(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Delete Product</button>
//       </form>

//       <h2>Edit Product Price:</h2>
//       <form onSubmit={handleEditPrice}>
//         {editError && <p style={{ color: "red" }}>{editError}</p>}
//         <label>
//           Product ID:
//           <input
//             type="text"
//             value={editProductId}
//             onChange={(e) => setEditProductId(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           New Price:
//           <input
//             type="number"
//             value={newPrice}
//             onChange={(e) => setNewPrice(e.target.value)}
//             step="0.01"
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Edit Price</button>
//       </form>

//       <h2>Shopping Cart:</h2>
//       <ul>
//         {Object.keys(cart).map((productId) => (
//           <li key={productId}>
//             {cart[productId].product.name} - Quantity: {cart[productId].quantity}
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleOrder}>Order</button>

//       <h2>User Information:</h2>
//       <form>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Address:
//           <input
//             type="text"
//             value={userAddress}
//             onChange={(e) => setUserAddress(e.target.value)}
//             required
//           />
//         </label>
//         <br />
//       </form>
//     </div>
//   );
// }

// export default App;