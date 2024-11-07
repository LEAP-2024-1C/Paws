"use client";
import React, { useContext } from "react";
import GetNewPass from "@/components/recover_pass/get_new_pass";
import ForgetPass from "@/components/recover_pass";

import { ProfileContext } from "@/components/context/profile_context";

const RecoverPass = () => {
  const { step } = useContext(ProfileContext);
  return (
    <div className="flex h-[calc(100vh-290px)] justify-center bg-[#F8F9FA] dark:bg-[#121212]">
      <div className="w-1/5 mt-24">
        {step === 1 && <ForgetPass />}
        {step === 2 && <GetNewPass />}
      </div>
    </div>
  );
};

export default RecoverPass;
