'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext } from 'react';
import { ProfileContext } from '../context/profile_context';

const ForgetPass = () => {
  const { handleEmail, handleSend } = useContext(ProfileContext);
  return (
    // {step === 2 && <GetNewPass/>}
    <>
      <h1 className="mb-8 text-center text-2xl font-semibold">
        Reset Password
      </h1>
      <Input
        type="email"
        className="mb-4 h-9 grow rounded-full border-none px-3 py-1 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Please enter your email"
        onChange={handleEmail}
      />
      <Button
        className="w-full bg-[#FD7E14]"
        size="custom"
        onClick={handleSend}
      >
        Send
      </Button>
    </>
  );
};

export default ForgetPass;
