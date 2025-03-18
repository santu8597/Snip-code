"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  animation?: any;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = 24,
  color = "currentColor",
  animation = {
    scale: [1, 1.2, 1],
    rotate: [0, 360, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}) => {
  return (
    <motion.div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      variants={{
        hover: { scale: 1.1 },
      }}
      whileHover="hover"
      animate={animation}
    >
      <Icon size={size} color={color} />
    </motion.div>
  );
};

export default AnimatedIcon;