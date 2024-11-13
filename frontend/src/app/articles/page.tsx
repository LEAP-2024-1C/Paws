"use client";
import HeroComponent from "@/components/main_page/hero_component";

import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { CatType, IArticles } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogsCards } from "@/components/home/blog-cards";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// const FeaturedArticle = ({ article }: { article: IArticles }) => (
//   <div className="relative h-[400px] w-full mb-16 group">
//     <div className="absolute inset-0 bg-black/30 rounded-xl z-10" />
//     <Image
//       src={article.images[0]}
//       alt={article.title}
//       fill
//       className="object-cover rounded-xl"
//     />
//     <div className="absolute bottom-8 left-8 z-20 text-white">
//       <span className="bg-amber-500 px-4 py-2 rounded-full text-sm">
//         {article.category.name}
//       </span>
//       <h2 className="text-3xl font-bold mt-4 max-w-2xl group-hover:text-amber-400 transition-colors">
//         {article.title}
//       </h2>
//       <p className="mt-2 text-gray-200 max-w-xl">
//         {article.description?.substring(0, 150)}...
//       </p>
//     </div>
//   </div>
// );

// const FeaturedArticleSkeleton = () => (
//   <div className="relative h-[400px] w-full mb-16">
//     <Skeleton className="h-full w-full rounded-xl" />
//     <div className="absolute bottom-8 left-8 z-20">
//       <Skeleton className="h-8 w-24 rounded-full" />
//       <Skeleton className="h-12 w-2/3 mt-4" />
//       <Skeleton className="h-4 w-1/2 mt-4" />
//     </div>
//   </div>
// );

const BlogCardSkeleton = () => (
  <div className="w-[340px] rounded-lg border shadow-xl m-auto">
    <Skeleton className="h-48 rounded-t-lg" />
    <div className="p-6">
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="px-6 pb-6">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

const CategorySkeleton = () => (
  <div className="flex items-center space-x-2 whitespace-nowrap">
    <Skeleton className="h-4 w-4" />
    <Skeleton className="h-4 w-24" />
  </div>
);

const Articles = () => {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [articleCat, setArticleCat] = useState<CatType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [isLoading, setIsLoading] = useState(true);

  const getArticles = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    } finally {
      setIsLoading(false);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articlesCat`);
      setArticleCat(res.data.articlescat);
      console.log("articles categories", res.data.articlescat);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get fetch articles categories categories");
    }
  };
  useEffect(() => {
    getArticles();
    getCategories();
  }, []);
  console.log("articles categories", articleCat);
  console.log("Articles data", articles);

  const filteredArticles = articles.filter((article) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(article.category._id);
  });

  const filteredAndSearchedArticles = filteredArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section className="h-fit md:mb-20">
      <HeroComponent />

      {/* Featured Article Section */}
      {/* <div className="container mx-auto px-4 mt-10">
        {isLoading ? (
          <FeaturedArticleSkeleton />
        ) : (
          articles.length > 0 && <FeaturedArticle article={articles[0]} />
        )}
      </div> */}

      {/* Search and Sort Controls */}
      <div className="container mx-auto px-4 mb-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-full md:w-96" />
              <Skeleton className="h-10 w-32" />
            </>
          ) : (
            <>
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  className="absolute right-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400"
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </>
          )}
        </div>
      </div>

      <main className="container mx-auto px-4 md:flex md:justify-center md:mt-20">
        {/* Categories Section */}
        <div className="mb-6 md:mb-0 md:mr-16">
          <h3 className="text-lg md:text-xl font-bold mb-3 hover:text-amber-400">
            Categories
          </h3>
          <div className="flex md:flex-col gap-4 md:gap-3 overflow-x-auto pb-2 md:overflow-visible my-10">
            {isLoading
              ? Array(5)
                  .fill(0)
                  .map((_, i) => <CategorySkeleton key={i} />)
              : articleCat?.map((category: CatType) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2 whitespace-nowrap"
                  >
                    <Checkbox
                      id={`cat-${category._id}`}
                      checked={selectedCategories.includes(category._id)}
                      onCheckedChange={() => handleCategoryChange(category._id)}
                    />
                    <label
                      htmlFor={`cat-${category._id}`}
                      className="text-sm md:text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
          </div>
        </div>

        {/* Articles Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => <BlogCardSkeleton key={i} />)
            : filteredAndSearchedArticles?.map((card: IArticles) => (
                <BlogsCards
                  image={card.images[0]}
                  id={card._id}
                  date={card.updatedAt}
                  title={card.title}
                  key={card._id}
                />
              ))}
        </section>
      </main>
    </section>
  );
};

export default Articles;
