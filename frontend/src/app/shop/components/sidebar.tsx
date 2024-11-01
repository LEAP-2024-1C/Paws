import React from "react";

interface Sidebar {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: { name: string; count: number }[];
}

const Sidebar: React.FC<Sidebar> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <aside className="w-full md:w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Filter by </h2>
      <ul>
        {categories.map((category) => (
          <li key={category.name} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={category.name}
              checked={selectedCategory === category.name}
              onChange={() => setSelectedCategory(category.name)}
              className="mr-2"
            />
            <label htmlFor={category.name} className="flex-grow">
              {category.name}
            </label>
            <span className="text-orange-500">{category.count}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
