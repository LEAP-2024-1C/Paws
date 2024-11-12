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
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? "" : categoryName);
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex justify-between items-center ${
            selectedCategory === ""
              ? "bg-orange-100 text-orange-600 font-medium shadow-sm"
              : "hover:bg-gray-50 text-gray-700"
          }`}
        >
          <span>All Products</span>
          <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex justify-between items-center ${
              selectedCategory === category.name
                ? "bg-orange-100 text-orange-600 font-medium shadow-sm"
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <span>{category.name}</span>
            <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
