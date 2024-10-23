import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col h-[calc(100vh-290px)] items-center bg-gray-100 dark:bg-[#121212]">
        <span className="loading loading-spinner text-[#0166FF] mt-24 mb-2"></span>
        <ClipLoader color="dark:white" />
        <p className="text-slate-900 dark:text-white font-semibold text-base mt-3">
          Түр хүлээнэ үү...
        </p>
      </div>
    </>
  );
};

export default Loading;
