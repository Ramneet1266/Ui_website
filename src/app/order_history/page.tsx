
// // "use client";
// // import { useState, useEffect } from "react";
// // import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// // import { db } from "@/app/lib/firebase";
// // import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
// // import Image from "next/image";
// // import OrderTimeline from "../component/orderTimeline";

// // type OrderStatus = "pending" | "accepted" | "rejected" | "packaged" | "onway" | "delivered";

// // interface Product {
// //   productImageUrl: string;
// //   productName: string;
// //   price: number;
// //   quantity: number;
// // }

// // interface Order {
// //   id: string;
// //   createdAt: string;
// //   products: Product[];
// //   status: string;
// // }

// // const OrderHistoryPage = () => {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [filteredStatus, setFilteredStatus] = useState("All");
// //   const [trackingOrder, setTrackingOrder] = useState<string | null>(null); // For order tracking

// //   useEffect(() => {
// //     const auth = getAuth();
// //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
// //       setUser(currentUser);
// //     });
// //     return () => unsubscribe();
// //   }, []);

// //   useEffect(() => {
// //     if (!user) return;

// //     const fetchOrders = async () => {
// //       try {
// //         const ordersQuery = query(
// //           collection(db, "Orders"),
// //           where("userId", "==", user.uid),
// //           orderBy("createdAt", "desc")
// //         );

// //         const ordersSnapshot = await getDocs(ordersQuery);
// //         const ordersData: Order[] = [];

// //         for (const orderDoc of ordersSnapshot.docs) {
// //           const orderData = orderDoc.data();
// //           const createdAt = orderData.createdAt?.toDate
// //             ? orderData.createdAt.toDate().toLocaleString()
// //             : "Unknown Date";

// //           const storesRef = collection(db, "Orders", orderDoc.id, "stores");
// //           const storesSnapshot = await getDocs(storesRef);

// //           let products: Product[] = [];
// //           for (const storeDoc of storesSnapshot.docs) {
// //             const productsRef = collection(
// //               db,
// //               "Orders",
// //               orderDoc.id,
// //               "stores",
// //               storeDoc.id,
// //               "products"
// //             );
// //             const productsSnapshot = await getDocs(productsRef);

// //             const storeProducts = productsSnapshot.docs.map((productDoc) => {
// //               const productData = productDoc.data();
// //               return {
// //                 productImageUrl: productData.productImageUrl || "",
// //                 productName: productData.name || "Unknown Product",
// //                 price: productData.price || 0,
// //                 quantity: productData.quantity || 0,
// //               };
// //             });

// //             products = [...products, ...storeProducts];
// //           }

// //           ordersData.push({
// //             id: orderDoc.id,
// //             createdAt,
// //             products,
// //             status: orderData.status,
// //           });
// //         }

// //         setOrders(ordersData);
// //       } catch (error) {
// //         console.error("Error fetching orders:", error);
// //       }
// //     };

// //     fetchOrders();
// //   }, [user]);

// //   // ✅ Filter orders based on selected status
// //   const filteredOrders =
// //     filteredStatus === "All"
// //       ? orders
// //       : orders.filter((order) => order.status === filteredStatus);

// //   return (
// //     <div className="mt-32">
// //       {/* Order Tracking Timeline */}
// //       {/* {trackingOrder && <OrderTimeline status={trackingOrder} />} */}
// //       {trackingOrder && <OrderTimeline status={trackingOrder as OrderStatus} />}

// //       <div className="container mt-32 mx-auto p-6 min-h-screen">
// //         <h1 className="text-2xl font-semibold mb-6 text-emerald-600 text-center">
// //           Order History
// //         </h1>

// //         {/* ✅ Filter Buttons */}
// //         <div className="flex justify-center space-x-2 mb-6">
// //           {["All", "Accepted", "Pending", "Rejected", "Onway", "Delivered"].map(
// //             (status) => (
// //               <button
// //                 key={status}
// //                 onClick={() => setFilteredStatus(status)}
// //                 className={`px-4 py-2 rounded text-white font-medium transition ${
// //                   filteredStatus === status
// //                     ? "bg-gray-900"
// //                     : status === "Accepted"
// //                     ? "bg-green-500"
// //                     : status === "Pending"
// //                     ? "bg-yellow-500"
// //                     : status === "Rejected"
// //                     ? "bg-red-500"
// //                     : status === "Onway"
// //                     ? "bg-blue-500"
// //                     : "bg-green-600"
// //                 }`}
// //               >
// //                 {status}
// //               </button>
// //             )
// //           )}
// //         </div>

// //         {/* ✅ Orders List */}
// //         {filteredOrders.length > 0 ? (
// //           <div className="space-y-6">
// //             {filteredOrders.map((order) => (
// //               <div
// //                 key={order.id}
// //                 className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto border-blue-500"
// //               >
// //                 <p className="text-gray-800">
// //                   Order Date:{" "}
// //                   <span className="font-medium">{order.createdAt}</span>
// //                 </p>

// //                 {/* ✅ Status Button */}
// //                 <p className="text-black">
// //                   Status:
// //                   <button
// //                     className={`ml-2 px-3 py-1 rounded text-white font-medium ${
// //                       order.status === "Accepted"
// //                         ? "bg-green-500"
// //                         : order.status === "Pending"
// //                         ? "bg-yellow-500"
// //                         : order.status === "Rejected"
// //                         ? "bg-red-500"
// //                         : order.status === "Onway"
// //                         ? "bg-blue-500"
// //                         : "bg-green-600"
// //                     }`}
// //                   >
// //                     {order.status}
// //                   </button>
// //                 </p>

// //                 {/* ✅ Track Order Button */}
// //                 <button
// //                   onClick={() => setTrackingOrder(order.status)}
// //                   className="mt-3 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
// //                 >
// //                   Track Order
// //                 </button>

// //                 {/* ✅ Order Products */}
// //                 <div className="mt-4 space-y-4">
// //                   {order.products.map((product, index) => (
// //                     <div
// //                       key={index}
// //                       className="flex items-center space-x-4 border-b pb-3"
// //                     >
// //                       <Image
// //                         src={product.productImageUrl}
// //                         alt={product.productName}
// //                         width={60}
// //                         height={60}
// //                         className="rounded-md object-cover"
// //                       />
// //                       <div>
// //                         <p className="font-semibold">{product.productName}</p>
// //                         <p className="text-sm text-gray-600">
// //                           Price: ₹{product.price}
// //                         </p>
// //                         <p className="text-sm text-gray-600">
// //                           Quantity: {product.quantity}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500 text-center">No orders found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderHistoryPage;






// "use client";
// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// import { db } from "@/app/lib/firebase";
// import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
// import Image from "next/image";
// import OrderTimeline from "../component/orderTimeline";

// type OrderStatus = "placed" | "accepted" | "rejected" | "packaged" | "onway" | "delivered";

// interface Product {
//   productImageUrl: string;
//   productName: string;
//   price: number;
//   quantity: number;
// }

// interface Order {
//   id: string;
//   createdAt: string;
//   products: Product[];
//   status: OrderStatus;
// }

// const OrderHistoryPage = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [filteredStatus, setFilteredStatus] = useState<OrderStatus | "All">("All");
//   const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (!user) return;

//     const fetchOrders = async () => {
//       try {
//         const ordersQuery = query(
//           collection(db, "Orders"),
//           where("userId", "==", user.uid),
//           orderBy("createdAt", "desc")
//         );

//         const ordersSnapshot = await getDocs(ordersQuery);
//         const ordersData: Order[] = [];

//         for (const orderDoc of ordersSnapshot.docs) {
//           const orderData = orderDoc.data();
//           const createdAt = orderData.createdAt?.toDate
//             ? orderData.createdAt.toDate().toLocaleString()
//             : "Unknown Date";

//           const productsRef = collection(db, "Orders", orderDoc.id, "products");
//           const productsSnapshot = await getDocs(productsRef);

//           const products = productsSnapshot.docs.map((productDoc) => {
//             const productData = productDoc.data();
//             return {
//               productImageUrl: productData.productImageUrl || "",
//               productName: productData.name || "Unknown Product",
//               price: productData.price || 0,
//               quantity: productData.quantity || 0,
//             };
//           });

//           ordersData.push({
//             id: orderDoc.id,
//             createdAt,
//             products,
//             status: orderData.status,
//           });
//         }

//         setOrders(ordersData);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   const filteredOrders =
//     filteredStatus === "All"
//       ? orders
//       : orders.filter((order) => order.status === filteredStatus);

//   return (
//     <div className="mt-32 container mx-auto p-6 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-emerald-700 text-center">Order History</h1>

//       {/* Filter Buttons */}
//       <div className="flex justify-center space-x-3 mb-6">
//         {["All", "accepted", "placed", "rejected", "onway", "delivered"].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilteredStatus(status as OrderStatus | "All")}
//             className={`px-4 py-2 rounded-lg font-medium transition shadow-md text-white ${
//               filteredStatus === status
//                 ? "bg-gray-900"
//                 : status === "accepted"
//                 ? "bg-green-500"
//                 : status === "placed"
//                 ? "bg-yellow-500"
//                 : status === "rejected"
//                 ? "bg-red-500"
//                 : status === "onway"
//                 ? "bg-blue-500"
//                 : "bg-green-600"
//             }`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Orders List */}
//       {filteredOrders.length > 0 ? (
//         <div className="space-y-8">
//           {filteredOrders.map((order) => (
//             <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto relative border-l-4 border-emerald-500">
//               <p className="text-gray-700 font-semibold">Order Date: {order.createdAt}</p>
//               <p className="text-gray-800">Status: 
//                 <span className={`ml-2 px-3 py-1 rounded-md text-white font-medium ${
//                   order.status === "accepted" ? "bg-green-500" :
//                   order.status === "placed" ? "bg-yellow-500" :
//                   order.status === "rejected" ? "bg-red-500" :
//                   order.status === "onway" ? "bg-blue-500" : "bg-green-600"
//                 }`}>{order.status}</span>
//               </p>

//               <button
//                 onClick={() => setTrackingOrderId(order.id)}
//                 className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition w-full"
//               >
//                 Track Order
//               </button>

//               {trackingOrderId === order.id && (
//                 <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//                   <OrderTimeline status={order.status} />
//                 </div>
//               )}

//               {/* Order Products */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {order.products.map((product, index) => (
//                   <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow">
//                     <Image
//                       src={product.productImageUrl}
//                       alt={product.productName}
//                       width={60}
//                       height={60}
//                       className="rounded-md object-cover"
//                     />
//                     <div className="ml-4">
//                       <p className="font-semibold text-gray-900">{product.productName}</p>
//                       <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
//                       <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       )}
//     </div>
//   );
// };


// export default OrderHistoryPage;





"use client";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, Package, Send, Truck, X } from "lucide-react";
import OrderTimeline from "../component/orderTimeline";

type OrderStatus = "pending" | "accepted" | "rejected" | "packaged" | "onway" | "delivered";

interface Product {
  productImageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

interface StatusTimestamps {
  pending?: string;
  accepted?: string;
  rejected?: string;
  packaged?: string;
  onway?: string;
  delivered?: string;
}

interface Order {
  id: string;
  createdAt: string;
  products: Product[];
  status: OrderStatus;
  statusTimestamps?: StatusTimestamps;
}

// Create our own Dialog components with proper TypeScript interfaces
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

// const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => onOpenChange(false)}>
//       <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );
// };

// Update the Dialog component to trigger timeline animations when opened
const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
      onClick={() => onOpenChange(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-auto" 
        onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300,
          damping: 30,
          delay: 0.1
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

const DialogContent = ({ children, className = "" }: DialogContentProps) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface DialogHeaderProps {
  children: React.ReactNode;
}

const DialogHeader = ({ children }: DialogHeaderProps) => {
  return <div className="mb-4">{children}</div>;
};

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle = ({ children, className = "" }: DialogTitleProps) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

// // Enhanced Timeline Component with proper TypeScript typing
// const OrderTimeline = ({ 
//   status, 
//   timestamps 
// }: { 
//   status: OrderStatus; 
//   timestamps?: StatusTimestamps 
// }) => {
//   const steps = [
//     { status: "placed" as OrderStatus, label: "Order Placed", icon: <Clock className="w-6 h-6" /> },
//     { status: "accepted" as OrderStatus, label: "Order Accepted", icon: <BadgeCheck className="w-6 h-6" /> },
//     { status: "packaged" as OrderStatus, label: "Order Packaged", icon: <Package className="w-6 h-6" /> },
//     { status: "onway" as OrderStatus, label: "On The Way", icon: <Truck className="w-6 h-6" /> },
//     { status: "delivered" as OrderStatus, label: "Delivered", icon: <Send className="w-6 h-6" /> },
//   ];

//   // Map for status index lookup
//   const statusMap: Record<OrderStatus, number> = {
//     placed: 0,
//     accepted: 1,
//     rejected: -1, // Special case
//     packaged: 2,
//     onway: 3,
//     delivered: 4,
//   };

//   const currentStatusIndex = statusMap[status];

//   return (
//     <div className="py-4 px-2">
//       {status === "rejected" ? (
//         <div className="flex flex-col items-center">
//           <div className="bg-red-100 p-6 rounded-full">
//             <X className="w-8 h-8 text-red-500" />
//           </div>
//           <h3 className="font-bold text-red-600 mt-2">Order Rejected</h3>
//           {timestamps?.rejected && (
//             <p className="text-sm text-gray-500">{new Date(timestamps.rejected).toLocaleString()}</p>
//           )}
//         </div>
//       ) : (
//         <div className="relative">
//           <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 to-emerald-500 rounded-full"></div>
          
//           <div className="space-y-8">
//             {steps.map((step, idx) => {
//               const isActive = idx <= currentStatusIndex;
//               const isPast = idx < currentStatusIndex;
              
//               return (
//                 <div key={step.status} className="relative flex items-center">
//                   <div className="flex items-center justify-center relative z-10">
//                     <motion.div 
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.4 }}
//                       transition={{ duration: 0.3 }}
//                       className={`rounded-full p-3 ${
//                         isActive 
//                           ? "bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg" 
//                           : "bg-gray-200 text-gray-400"
//                       }`}
//                     >
//                       {step.icon}
//                     </motion.div>
//                   </div>
                  
//                   <div className="ml-4">
//                     <h3 className={`font-bold ${isActive ? "text-emerald-700" : "text-gray-400"}`}>
//                       {step.label}
//                     </h3>
                    
//                     {timestamps && step.status in timestamps && timestamps[step.status] && (
//                       <p className="text-sm text-gray-500">
//                         {new Date(timestamps[step.status]!).toLocaleString()}
//                       </p>
//                     )}
                    
//                     {isPast && (!timestamps || !timestamps[step.status]) && (
//                       <p className="text-xs text-gray-400">Completed</p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// Enhanced Timeline Component with animations and creative connectors

// const OrderTimeline = ({ 
//   status, 
//   timestamps 
// }: { 
//   status: OrderStatus; 
//   timestamps?: StatusTimestamps 
// }) => {
//   const steps = [
//     { status: "placed" as OrderStatus, label: "Order Placed", icon: <Clock className="w-6 h-6" /> },
//     { status: "accepted" as OrderStatus, label: "Order Accepted", icon: <BadgeCheck className="w-6 h-6" /> },
//     { status: "packaged" as OrderStatus, label: "Order Packaged", icon: <Package className="w-6 h-6" /> },
//     { status: "onway" as OrderStatus, label: "On The Way", icon: <Truck className="w-6 h-6" /> },
//     { status: "delivered" as OrderStatus, label: "Delivered", icon: <Send className="w-6 h-6" /> },
//   ];

//   // Map for status index lookup
//   const statusMap: Record<OrderStatus, number> = {
//     placed: 0,
//     accepted: 1,
//     rejected: -1, // Special case
//     packaged: 2,
//     onway: 3,
//     delivered: 4,
//   };

//   const currentStatusIndex = statusMap[status];

//   // Animation variants for timeline elements
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.3,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 }
//   };

//   const lineVariants = {
//     hidden: { height: 0, opacity: 0 },
//     visible: (custom: number) => ({
//       height: "100%",
//       opacity: 1,
//       transition: { 
//         duration: 0.8,
//         delay: custom * 0.2
//       }
//     })
//   };

//   // Generate random zigzag path for connector lines
//   const generateZigzagPath = (index: number) => {
//     const amplitude = 3 + (index % 3) * 2; // Vary the zigzag amplitude
//     const frequency = 0.2 + (index % 4) * 0.1; // Vary the zigzag frequency
    
//     return `path("M 0,0 ${Array.from({ length: 6 }, (_, i) => 
//       `Q ${amplitude * Math.sin(i * frequency * Math.PI)},${i * 16} 0,${(i + 1) * 20}`
//     ).join(" ")}")`;
//   };

//   return (
//     <div className="py-4 px-2">
//       {status === "rejected" ? (
//         <motion.div 
//           className="flex flex-col items-center"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5, type: "spring" }}
//         >
//           <div className="bg-red-100 p-6 rounded-full relative overflow-hidden">
//             <motion.div
//               className="absolute inset-0 bg-red-200"
//               initial={{ scale: 0 }}
//               animate={{ scale: [0, 1.5, 1] }}
//               transition={{ duration: 0.7, times: [0, 0.7, 1] }}
//             />
//             <motion.div
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <X className="w-8 h-8 text-red-500 relative z-10" />
//             </motion.div>
//           </div>
//           <motion.h3 
//             className="font-bold text-red-600 mt-2"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             Order Rejected
//           </motion.h3>
//           {timestamps?.rejected && (
//             <motion.p 
//               className="text-sm text-gray-500"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               {new Date(timestamps.rejected).toLocaleString()}
//             </motion.p>
//           )}
//         </motion.div>
//       ) : (
//         <motion.div 
//           className="relative"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           // key={isTimelineOpen ? "open" : "closed"} // Reset animation when modal opens
//         >
//           {/* Central timeline spine with gradient and animation */}
//           <motion.div 
//             className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-200 via-teal-300 to-emerald-500 rounded-full"
//             initial={{ height: 0 }}
//             animate={{ height: "100%" }}
//             transition={{ duration: 1 }}
//           />
          
//           <div className="space-y-12 relative">
//             {steps.map((step, idx) => {
//               const isActive = idx <= currentStatusIndex;
//               const isPast = idx < currentStatusIndex;
//               const isNext = idx === currentStatusIndex + 1;
              
//               return (
//                 <motion.div 
//                   key={step.status} 
//                   className="relative flex items-center"
//                   variants={itemVariants}
//                   custom={idx}
//                 >
//                   {/* Connector lines with creative styles */}
//                   {idx > 0 && (
//                     <motion.div 
//                       className={`absolute left-1/2 transform -translate-x-1/2 w-1 -top-12 ${
//                         isActive || isPast 
//                           ? "bg-gradient-to-b from-emerald-300 to-teal-500" 
//                           : "bg-gray-200"
//                       } overflow-hidden`}
//                       style={{ height: "48px" }}
//                       initial="hidden"
//                       animate="visible"
//                       variants={lineVariants}
//                       custom={idx}
//                     >
//                       {/* Animated moving dot for active connections */}
//                       {(isActive || isPast) && (
//                         <motion.div 
//                           className="absolute w-3 h-3 bg-white shadow-lg rounded-full left-1/2 transform -translate-x-1/2"
//                           animate={{ 
//                             y: ["0%", "100%"],
//                             x: idx % 2 === 0 ? ["0%", "-100%", "0%", "100%", "0%"] : ["0%", "100%", "0%", "-100%", "0%"]
//                           }}
//                           transition={{ 
//                             y: { duration: 1.5, repeat: Infinity, repeatType: "loop" },
//                             x: { duration: 1.5, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, repeatType: "loop" }
//                           }}
//                         />
//                       )}
                      
//                       {/* Zigzag path for branch connectors */}
//                       {(isActive || isPast) && idx % 2 === 1 && (
//                         <motion.div 
//                           className="absolute left-0 h-full w-6 border-t-2 border-l-2 border-emerald-400"
//                           style={{ borderRadius: "8px 0 0 0" }}
//                           initial={{ width: 0 }}
//                           animate={{ width: 6 }}
//                           transition={{ duration: 0.3, delay: idx * 0.2 }}
//                         />
//                       )}
                      
//                       {(isActive || isPast) && idx % 2 === 0 && idx > 0 && (
//                         <motion.div 
//                           className="absolute right-0 h-full w-6 border-t-2 border-r-2 border-teal-400"
//                           style={{ borderRadius: "0 8px 0 0" }}
//                           initial={{ width: 0 }}
//                           animate={{ width: 6 }}
//                           transition={{ duration: 0.3, delay: idx * 0.2 }}
//                         />
//                       )}
//                     </motion.div>
//                   )}
                  
//                   <div className="flex items-center justify-center relative z-10">
//                     <motion.div 
//                       initial={{ scale: 0.8, opacity: 0 }}
//                       animate={{ scale: isActive ? 1 : 0.8, opacity: isActive ? 1 : 0.4 }}
//                       transition={{ 
//                         duration: 0.4, 
//                         delay: idx * 0.15,
//                         type: "spring", 
//                         stiffness: 200 
//                       }}
//                       className={`rounded-full p-3 ${
//                         isActive 
//                           ? "bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg" 
//                           : "bg-gray-200 text-gray-400"
//                       }`}
//                     >
//                       {/* Animated icon */}
//                       <motion.div
//                         animate={isActive ? { 
//                           rotate: [0, 10, -10, 10, 0],
//                           scale: [1, 1.2, 1]
//                         } : {}}
//                         transition={{ 
//                           duration: 0.5, 
//                           delay: idx * 0.3 + 0.5, 
//                           ease: "easeInOut" 
//                         }}
//                       >
//                         {step.icon}
//                       </motion.div>
//                     </motion.div>
                    
//                     {/* Decorative elements */}
//                     {isActive && (
//                       <motion.div
//                         className="absolute inset-0 rounded-full"
//                         initial={{ opacity: 0.7, scale: 1 }}
//                         animate={{ opacity: 0, scale: 1.5 }}
//                         transition={{ 
//                           duration: 1.5, 
//                           repeat: Infinity,
//                           repeatType: "loop"
//                         }}
//                         style={{ 
//                           background: `radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(0, 0, 0, 0) 70%)`
//                         }}
//                       />
//                     )}
                    
//                     {/* Highlight for next step */}
//                     {isNext && (
//                       <motion.div
//                         className="absolute inset-0 rounded-full"
//                         initial={{ opacity: 0.3, scale: 1 }}
//                         animate={{ opacity: 0.7, scale: [1, 1.1, 1] }}
//                         transition={{ 
//                           duration: 2, 
//                           repeat: Infinity,
//                           repeatType: "loop"
//                         }}
//                         style={{ 
//                           background: `radial-gradient(circle, rgba(209, 213, 219, 0.5) 0%, rgba(0, 0, 0, 0) 70%)`
//                         }}
//                       />
//                     )}
//                   </div>
                  
//                   <div className="ml-4">
//                     <motion.h3 
//                       className={`font-bold ${isActive ? "text-emerald-700" : "text-gray-400"}`}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: idx * 0.15 + 0.2 }}
//                     >
//                       {step.label}
//                     </motion.h3>
                    
//                     {timestamps && step.status in timestamps && timestamps[step.status] && (
//                       <motion.p 
//                         className="text-sm text-gray-500"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3, delay: idx * 0.15 + 0.4 }}
//                       >
//                         {new Date(timestamps[step.status]!).toLocaleString()}
//                       </motion.p>
//                     )}
                    
//                     {isPast && (!timestamps || !timestamps[step.status]) && (
//                       <motion.p 
//                         className="text-xs text-gray-400"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3, delay: idx * 0.15 + 0.4 }}
//                       >
//                         Completed
//                       </motion.p>
//                     )}
//                   </div>
                  
//                   {/* Side branch connector animations for alternating sides */}
//                   {isActive && idx % 2 === 0 && (
//                     <motion.div
//                       className="absolute -right-4 w-4 border-t-2 border-dashed border-emerald-400"
//                       style={{ top: "50%" }}
//                       initial={{ width: 0 }}
//                       animate={{ width: 40 }}
//                       transition={{ duration: 0.4, delay: idx * 0.2 + 0.3 }}
//                     >
//                       <motion.div 
//                         className="absolute -right-6 -top-1 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.3, delay: idx * 0.2 + 0.7 }}
//                       >
//                         <span className="text-xs font-bold text-emerald-600">{idx + 1}</span>
//                       </motion.div>
//                     </motion.div>
//                   )}
                  
//                   {isActive && idx % 2 === 1 && (
//                     <motion.div
//                       className="absolute -left-4 w-4 border-t-2 border-dashed border-emerald-400"
//                       style={{ top: "50%" }}
//                       initial={{ width: 0 }}
//                       animate={{ width: 40 }}
//                       transition={{ duration: 0.4, delay: idx * 0.2 + 0.3 }}
//                     >
//                       <motion.div 
//                         className="absolute -left-6 -top-1 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center"
//                         initial={{ scale: 0 }}
//                         animate={{ scale: 1 }}
//                         transition={{ duration: 0.3, delay: idx * 0.2 + 0.7 }}
//                       >
//                         <span className="text-xs font-bold text-emerald-600">{idx + 1}</span>
//                       </motion.div>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

const OrderTimelines = ({ 
  status, 
  timestamps 
}: { 
  status: OrderStatus; 
  timestamps?: StatusTimestamps 
}) => {
  const steps = [
    { status: "pending" as OrderStatus, label: "Order Placed", icon: <Clock className="w-6 h-6" /> },
    { status: "accepted" as OrderStatus, label: "Order Accepted", icon: <BadgeCheck className="w-6 h-6" /> },
    { status: "packaged" as OrderStatus, label: "Order Packaged", icon: <Package className="w-6 h-6" /> },
    { status: "onway" as OrderStatus, label: "On The Way", icon: <Truck className="w-6 h-6" /> },
    { status: "delivered" as OrderStatus, label: "Delivered", icon: <Send className="w-6 h-6" /> },
  ];

  const statusMap: Record<OrderStatus, number> = {
    pending: 0,
    accepted: 1,
    rejected: -1,
    packaged: 2,
    onway: 3,
    delivered: 4,
  };

  const currentStatusIndex = statusMap[status];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 20
      } 
    }
  };

  const lineVariants = (index: number) => ({
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: index * 0.3,
        duration: 0.6,
        type: "spring",
        bounce: 0.3
      }
    }
  });

  return (
    <div className="py-4 px-2 relative">
      {status === "rejected" ? (
        <motion.div 
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="bg-red-100 p-6 rounded-full relative">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <motion.h3 
            className="font-bold text-red-600 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order Rejected
          </motion.h3>
          {timestamps?.rejected && (
            <motion.p className="text-sm text-gray-500">
              {new Date(timestamps.rejected).toLocaleString()}
            </motion.p>
          )}
        </motion.div>
      ) : (
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Progressive timeline line */}
          {/* <div className="absolute left-3/4 top-0 bottom-0 -translate-x-1/2 w-3 bg-gray-200 rounded-full overflow-hidden">
            {steps.map((_, idx) => (
              <motion.div
                key={idx}
                className="absolute w-full h-1/5 bg-emerald-500 origin-top"
                style={{ top: `${idx * 20}%` }}
                variants={lineVariants(idx)}
                custom={idx}
                animate={idx <= currentStatusIndex ? "visible" : "hidden"}
              />
            ))}
          </div> */}
          Progressive timeline line with stops
<div className="absolute left-3/4 top-0 bottom-0 -translate-x-1/2 w-2 bg-gray-200 rounded-full overflow-hidden">
  {steps.map((_, idx) => (
    <div key={idx} className="absolute left-0 right-0" style={{ top: `${idx * 20}%` }}>
      {/* Timeline segment */}
      <motion.div
        className="absolute w-full h-[20%] bg-emerald-500 origin-top"
        variants={{
          hidden: { scaleY: 0, opacity: 0 },
          visible: { 
            scaleY: 1, 
            opacity: 1,
            transition: {
              duration: 0.6,
              type: "spring",
              bounce: 0.3
            }
          }
        }}
        animate={idx <= currentStatusIndex ? "visible" : "hidden"}
        transition={{ delay: idx * 0.3 }}
      />
      
      {/* Timeline stop */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 shadow-sm"
        style={{ 
          borderColor: idx <= currentStatusIndex ? "#10B981" : "#E5E7EB",
          backgroundColor: idx <= currentStatusIndex ? "#10B981" : "transparent"
        }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          transition: { 
            delay: idx * 0.3 + 0.2,
            type: "spring" 
          }
        }}
      />
    </div>
  ))}
</div>

          <div className="space-y-16 relative">
            {steps.map((step, idx) => {
              const isActive = idx <= currentStatusIndex;
              const isPast = idx < currentStatusIndex;
              const isNext = idx === currentStatusIndex + 1;

              return (
                <motion.div 
                  key={step.status} 
                  className="relative flex items-center"
                  variants={itemVariants}
                >
                  {/* Step connector */}
                  {idx > 0 && (
                    <motion.div 
                      className={`absolute left-1/2 -translate-x-1/2 -top-16 w-1 h-16 ${
                        isActive ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.3 }}
                    />
                  )}

                  {/* Step indicator */}
                  <div className="relative z-10">
                    <motion.div 
                      className={`rounded-full p-4 relative ${
                        isActive 
                          ? "bg-emerald-500 shadow-lg" 
                          : "bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="text-white"
                        animate={isActive ? { 
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          delay: idx * 0.2
                        }}
                      >
                        {step.icon}
                      </motion.div>
                    </motion.div>

                    {/* Progress pulse */}
                    {isPast && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-emerald-500"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      />
                    )}
                  </div>

                  {/* Step label */}
                  <motion.div 
                    className="ml-6 space-y-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.3 + 0.3 }}
                  >
                    <h3 className={`font-bold text-lg ${
                      isActive ? "text-emerald-700" : "text-gray-400"
                    }`}>
                      {step.label}
                    </h3>
                    {timestamps && step.status in timestamps && timestamps[step.status] && (
                      <p className="text-sm text-gray-500">
                        {new Date(timestamps[step.status]!).toLocaleString()}
                      </p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

const OrderHistoryPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<OrderStatus | "All">("All");
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
          const createdAt = orderData.createdAt?.toDate
            ? orderData.createdAt.toDate().toLocaleString()
            : "Unknown Date";

          const productsRef = collection(db, "Orders", orderDoc.id, "products");
          const productsSnapshot = await getDocs(productsRef);

          const products = productsSnapshot.docs.map((productDoc) => {
            const productData = productDoc.data();
            return {
              productImageUrl: productData.productImageUrl || "",
              productName: productData.name || "Unknown Product",
              price: productData.price || 0,
              quantity: productData.quantity || 0,
            };
          });

          // Get timestamps for each status change (if they exist)
          const statusTimestamps: StatusTimestamps = {
            pending: orderData.createdAt?.toDate()?.toISOString(),
            accepted: orderData.acceptedAt?.toDate()?.toISOString(),
            rejected: orderData.rejectedAt?.toDate()?.toISOString(),
            packaged: orderData.packagedAt?.toDate()?.toISOString(),
            onway: orderData.onwayAt?.toDate()?.toISOString(),
            delivered: orderData.deliveredAt?.toDate()?.toISOString(),
          };

          ordersData.push({
            id: orderDoc.id,
            createdAt,
            products,
            status: orderData.status,
            statusTimestamps,
          });
        }

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders =
    filteredStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filteredStatus);

  const handleTrackOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsTimelineOpen(true);
  };

  // Calculate total order amount
  const getOrderTotal = (products: Product[]) => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case "accepted": return "from-green-400 to-green-600";
      case "pending": return "from-yellow-400 to-yellow-600";
      case "rejected": return "from-red-400 to-red-600";
      case "packaged": return "from-indigo-400 to-indigo-600";
      case "onway": return "from-blue-400 to-blue-600";
      case "delivered": return "from-emerald-400 to-emerald-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="mt-24 container mx-auto p-4 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Your Orders
        </h1>
        <p className="text-gray-600">Track and manage your purchase history</p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="mb-8">
        <div className="flex justify-center flex-wrap gap-2">
          {["All", "pending", "accepted", "packaged", "onway", "delivered", "rejected"].map((status, index) => (
            <motion.button
              key={status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setFilteredStatus(status as OrderStatus | "All")}
              className={`px-5 py-2 rounded-full font-medium transition-all shadow-md text-white ${
                filteredStatus === status
                  ? "bg-gradient-to-r from-gray-800 to-gray-900 scale-105 shadow-lg"
                  : `bg-gradient-to-r ${
                      status === "All" 
                        ? "from-gray-500 to-gray-700" 
                        : getStatusColor(status as OrderStatus)
                    }`
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 max-w-4xl mx-auto border-t-4 border-emerald-500"
            >
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div>
                    <p className="text-gray-700 font-semibold flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                      {order.createdAt}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Order #{order.id}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="my-4 border-t border-dashed border-gray-200 pt-4">
                  <h3 className="font-bold text-gray-700 mb-2">Order Items</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {order.products.map((product, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={product.productImageUrl}
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium text-gray-900 line-clamp-1">{product.productName}</p>
                          <div className="flex justify-between mt-1 text-sm text-gray-600">
                            <p>₹{product.price.toLocaleString()}</p>
                            <p>x{product.quantity}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-gray-800">
                    <span className="text-sm text-gray-500">Total:</span>
                    <span className="font-bold text-lg ml-2">₹{getOrderTotal(order.products).toLocaleString()}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTrackOrder(order)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2 rounded-full hover:shadow-lg transition font-medium flex items-center"
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Track Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-10 bg-gray-50 rounded-xl max-w-lg mx-auto"
        >
          <Image 
            src="/api/placeholder/120/120" 
            width={120} 
            height={120} 
            alt="No orders" 
            className="mx-auto mb-4" 
          />
          <p className="text-xl font-medium text-gray-500">No orders found.</p>
          <p className="text-gray-400 mt-2">Your order history will appear here once you make a purchase.</p>
        </motion.div>
      )}

      {/* Timeline Modal Dialog */}
      <Dialog open={isTimelineOpen} onOpenChange={setIsTimelineOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-emerald-700">
              Tracking Order #{selectedOrder?.id.substring(0, 8)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <OrderTimeline 
                status={selectedOrder.status} 
                timestamps={selectedOrder.statusTimestamps} 
              />

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2 text-xl">Order Summary</h4>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Order Date:</span>
                    <span>{selectedOrder.createdAt}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Total Items:</span>
                    <span>{selectedOrder.products.length}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Order Amount:</span>
                    <span className="font-semibold">₹{getOrderTotal(selectedOrder.products).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderHistoryPage;