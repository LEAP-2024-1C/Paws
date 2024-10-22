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
      <h1 className="font-semibold text-2xl text-center mb-2 mt-6">
        Баталгаажуулах
      </h1>
      <p className="text-center">
        {`"${enterEmail}" хаягт илгээсэн баталгаажуулах кодыг оруулна уу`}
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
          Дахин илгээх ({countDown})
        </Button>
      </div>
    </>
  );
};

export default GetNewPass;
