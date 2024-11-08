import React, { useContext } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { ProfileContext } from "../context/profile_context";

const GetNewPass = () => {
  const { enterEmail, otpValue, handleConfirmOtp, handleResendOtp, countDown } =
    useContext(ProfileContext);
  return (
    <>
      <img src="/images/email.png" alt="" className="m-auto" />
      <h1 className="font-semibold text-2xl text-center mb-2 mt-6">Confirm</h1>
      <p className="text-center">
        {`Please enter the code sent to "${enterEmail}" `}
      </p>
      <div className="flex justify-center mt-6 mb-12">
        <InputOTP maxLength={4} value={otpValue} onChange={handleConfirmOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex flex-col gap-12">
        <Button
          variant="ghost"
          className="text-center underline text-sm text-[#71717A] mt-4 mb-12"
          onClick={handleResendOtp}>
          Send code again ({countDown})
        </Button>
      </div>
    </>
  );
};

export default GetNewPass;
