import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-[#F8F9FA]  dark:bg-[#121212]">
        <span className="loading loading-spinner mb-2 mt-24 text-[#0166FF]"></span>
        <ClipLoader color="dark:white" />
        <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
          Түр хүлээнэ үү...
        </p>
      </div>
    </>
  );
};

export default Loading;
