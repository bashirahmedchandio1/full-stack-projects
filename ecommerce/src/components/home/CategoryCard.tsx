"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  slug: string;
  index: number;
}

export const CategoryCard = ({
  name,
  icon: Icon,
  slug,
  index,
}: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/store/products?category=${slug}`}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-3 p-6 rounded-lg bg-card hover:bg-accent transition-colors cursor-pointer group"
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
          >
            <Icon className="w-8 h-8 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-center">{name}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
};
