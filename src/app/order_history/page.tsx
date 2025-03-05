"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/app/lib/firebase"; 
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Image from "next/image";

interface Product {
  productImageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  createdAt: string;
  products: Product[];
  status: string;
}

const OrderHistoryPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredStatus, setFilteredStatus] = useState("All"); //Status filter

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const ordersQuery = query(
          collection(db, "Orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
    
        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersData: Order[] = [];
    
        for (const orderDoc of ordersSnapshot.docs) {
          const orderData = orderDoc.data();
          const createdAt = orderData.createdAt && orderData.createdAt.toDate 
            ? orderData.createdAt.toDate().toLocaleString() 
            : "Unknown Date";
    
          const storesRef = collection(db, "Orders", orderDoc.id, "stores");
          const storesSnapshot = await getDocs(storesRef);
    
          let products: Product[] = [];
          for (const storeDoc of storesSnapshot.docs) {
            const productsRef = collection(db, "Orders", orderDoc.id, "stores", storeDoc.id, "products");
            const productsSnapshot = await getDocs(productsRef);
            
            const storeProducts = productsSnapshot.docs.map((productDoc) => {
              const productData = productDoc.data();
              return {
                productImageUrl: productData.productImageUrl || "",
                productName: productData.name || "Unknown Product",
                price: productData.price || 0,
                quantity: productData.quantity || 0,
              };
            });

            products = [...products, ...storeProducts];
          }
    
          ordersData.push({
            id: orderDoc.id,
            createdAt,
            products,
            status: orderData.status,
          });
        }
    
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  // ✅ Filter orders based on selected status
  const filteredOrders = filteredStatus === "All"
    ? orders
    : orders.filter(order => order.status === filteredStatus);

  return (
    <div className="container mx-auto p-6 min-h-screen mt-32">
      <h1 className="text-2xl font-semibold mb-6 text-emerald-600 text-center">Order History</h1>

      {/* ✅ Filter Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        {["All", "Delivered", "Onway", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilteredStatus(status)}
            className={`
              px-4 py-2 rounded text-white font-medium transition 
              ${filteredStatus === status ? "bg-gray-900" 
                : status === "Delivered" ? "bg-green-500" 
                : status === "Onway" ? "bg-blue-500" 
                : "bg-yellow-500"}
            `}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ✅ Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6 ">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto border-blue-500">
              <p className="text-gray-800">Order Date: <span className="font-medium">{order.createdAt}</span></p>
              
              {/* ✅ Status Button */}
              <p className="text-black">
                Status:
                <button
                  className={`
                    ml-2 px-3 py-1 rounded text-white font-medium
                    ${order.status === "Delivered" ? "bg-green-500" 
                      : order.status === "Onway" ? "bg-blue-500" 
                      : "bg-yellow-500"}
                  `}
                >
                  {order.status}
                </button>
              </p>

              <div className="mt-4 space-y-4 ">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 border-b pb-3">
                    <Image 
                      src={product.productImageUrl} 
                      alt={product.productName} 
                      width={60} 
                      height={60} 
                      className="rounded-md object-cover" 
                    />
                    <div>
                      <p className="font-semibold">{product.productName}</p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistoryPage;
