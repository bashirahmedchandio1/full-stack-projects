"use client";

import {
  Shirt,
  Headphones,
  Carrot,
  Dumbbell,
} from "lucide-react";
import { CategoryCard } from "./CategoryCard";

const categories = [
  {
    name: "Electronics",
    icon: Headphones,
    slug: "electronics",
  },
  {
    name: "Fashion",
    icon: Shirt,
    slug: "fashion",
  },
  {
    name: "Groceries",
    icon: Carrot,
    slug: "groceries",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    slug: "sports",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Browse by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.slug}
              name={category.name}
              icon={category.icon}
              slug={category.slug}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
