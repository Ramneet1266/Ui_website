import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { FaBox, FaCheck, FaTruck, FaTimes, FaShoppingCart, FaGift } from "react-icons/fa";

type OrderStatus = "placed" | "accepted" | "rejected" | "packaged" | "onway" | "delivered";

const orderStages: { id: OrderStatus; label: string; icon: JSX.Element; stop?: boolean }[] = [
    { id: "placed", label: "Order Placed", icon: <FaShoppingCart /> },
    { id: "accepted", label: "Accepted", icon: <FaCheck /> },
    { id: "rejected", label: "Rejected", icon: <FaTimes />, stop: true },
    { id: "packaged", label: "Packaged", icon: <FaBox /> },
    { id: "onway", label: "On the Way", icon: <FaTruck /> },
    { id: "delivered", label: "Delivered", icon: <FaGift /> },
  ];

interface OrderTimelineProps {
    status: OrderStatus;
  }
const OrderTimeline:React.FC<OrderTimelineProps> = ({status}) => {
  const activeStages: ({ id: string; label: string; icon: JSX.Element; stop?: undefined; } | { id: string; label: string; icon: JSX.Element; stop: boolean; })[] = [];
  for (const stage of orderStages) {
    activeStages.push(stage);
    if (stage.id === status) break; // Stop at the current status
    if (stage.stop) break; // Stop if rejected
  }

  return (
    <div className="flex items-center justify-center space-x-6 mt-6">
      {orderStages.map((stage, index) => (
        <div key={stage.id} className="relative flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: activeStages.includes(stage) ? 1 : 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`w-14 h-14 flex items-center justify-center text-white rounded-full text-xl 
              ${activeStages.includes(stage) ? "bg-blue-500 shadow-lg" : "bg-gray-300"}
              ${stage.id === status ? "animate-pulse" : ""}
            `}
          >
            {stage.icon}
          </motion.div>
          <p className="mt-2 text-sm font-semibold text-gray-700">{stage.label}</p>
          {index < orderStages.length - 1 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: activeStages.includes(orderStages[index + 1]) ? 40 : 0 }}
              transition={{ duration: 0.5 }}
              className="h-2 bg-blue-500 absolute top-6 left-16"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
