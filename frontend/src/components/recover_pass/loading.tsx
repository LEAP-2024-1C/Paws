import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "../header";
import Footer from "../footer";

const Loading = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col h-[calc(100vh-290px)] items-center bg-[#F8F9FA] dark:bg-[#121212]">
        <span className="loading loading-spinner text-[#0166FF] mt-24 mb-2"></span>
        <ClipLoader color="dark:white" />
        <p className="text-slate-900 dark:text-white font-semibold text-base mt-3">
          Please wait...
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Loading;
