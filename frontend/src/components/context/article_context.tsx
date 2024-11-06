"use client";

import { IArticles } from "@/lib/types";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { ReactNode, useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";

interface ArticleContextType {
  articles: IArticles[];
  setArticles: React.Dispatch<React.SetStateAction<IArticles[]>>;
  getArticles: () => void;
  findPost: (searchValue: string) => IArticles[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  deleteArticlePost: (id: string) => Promise<void>; // Ensure it's included in the type
}

export const ArticleContext = createContext<ArticleContextType>({
  articles: [],
  setArticles: () => {},
  getArticles: () => {},
  findPost: () => [],
  searchValue: "",
  setSearchValue: () => {},
  deleteArticlePost: async () => {}, // Default value for deleteArticlePost
});

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const getArticles = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    }
  };

  const deleteArticlePost = async (id: string) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/articles/${id}`); // Use DELETE method
      if (res.status === 200) {
        await getArticles(); // Refresh articles after deletion
        toast.success("Successfully deleted article post");
      }
    } catch (error) {
      console.error("Failed to delete article post", error);
      toast.error("Failed to delete article post");
    }
  };

  const findPost = (searchValue: string) => {
    return articles.filter((card) =>
      card.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <ArticleContext.Provider
      value={{
        articles,
        setArticles,
        getArticles,
        findPost,
        searchValue,
        setSearchValue,
        deleteArticlePost,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
