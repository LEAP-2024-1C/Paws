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
  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(
      selectedCategory === categoryName ? "All" : categoryName
    );
  };

  return (
    <div className="w-full md:w-1/4 p-4">
      <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        <li className="mb-2 flex items-center">
          <input
            type="checkbox"
            id="all"
            checked={selectedCategory === "All"}
            onChange={() => setSelectedCategory("All")}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <label htmlFor="all" className="flex-grow cursor-pointer">
            All Products
          </label>
        </li>
        {categories.map((category) => (
          <li key={category.name} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={category.name}
              checked={selectedCategory === category.name}
              onChange={() => handleCategoryChange(category.name)}
              className="mr-2 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor={category.name} className="flex-grow cursor-pointer">
              {category.name}
            </label>
            <span className="text-orange-500 text-sm">{category.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
