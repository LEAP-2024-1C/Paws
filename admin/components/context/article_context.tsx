// 'use client';
// import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
// import { apiUrl } from '@/utils/util';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';

// interface ArticleForm {
//     id: string;
//     title: string;
//     text: string,
//     images: [string];
//     category: {name: ""}
// }

// interface ArticleContextType{
//     articleForm: ArticleForm;
//     setArticleForm: (articleForm: ArticleForm) => void;
//     handlePostValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const ArticleContext = createContext<ArticleContextType>({
//     handlePostValues: () => {},
//     articleForm: {
//         id: "",
//         title:"",
//         text: "",
//         images: [""],
//         category: { name: "" }
//     },
//     setArticleForm: (articleForm: ArticleForm) => {},
//     }
// );

// export const ArticleProvider = ({
//   children
// }: {
//   children: React.ReactNode;
// }) => {
//   const router = useRouter();
//   const [articleForm, setArticleForm] = useState<ArticleForm>({
//     id: "",
//     title:"",
//     text: "",
//     images: [""],
//     category: { name: "" }
//   });
// }
// console.log("ddd", articleForm);
//  const handlePostValues = ( e: ChangeEvent<HTMLInputElement>) => {
//     const { value, name} = e.target;
//     setArticleForm({...setArticleForm, [name]: value})
//  }
// const createArticle = async () => {
// //   const { id, title, text, images, category } = articleForm;
//   try {
//     const res= await axios.post(`${apiUrl}/api/v1/articles` {
//         // title: articleForm.title,
//         // text,
//         // images,
//         // category,
//     });
//   } catch (error) {
//     console.log("error", error);
//     toast.error("Failed to create article")
//   }
// };
// function setArticleForm(arg0: any) {
//     throw new Error('Function not implemented.');
// }

// return (
//     <ArticleContext.Provider value={{
//         handlePostValues,
//         setArticleForm,
//         articleForm

//     }}>
//         {children}
//     </ArticleContext.Provider>
// )

// export default ArticleProvider;
