"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext } from "react";
import { ProfileContext } from "../context/profile_context";

const ForgetPass = () => {
  const { handleEmail, handleSend } = useContext(ProfileContext);
  return (
    // {step === 2 && <GetNewPass/>}
    <>
      <h1 className="font-semibold text-2xl text-center mb-8">
        Reset Password
      </h1>
      <Input
        type="email"
        className="rounded-full grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0 px-3 py-1 mb-4"
        placeholder="Please enter your email"
        onChange={handleEmail}
      />
      <Button
        className="bg-[#FD7E14] w-full"
        size="custom"
        onClick={handleSend}>
        Send
      </Button>
    </>
  );
};

export default ForgetPass;
