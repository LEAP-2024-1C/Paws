import React, { useContext } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { ProfileContext } from '../context/profile_context';

const GetNewPass = () => {
  const { enterEmail, otpValue, handleConfirmOtp, handleResendOtp, countDown } =
    useContext(ProfileContext);
  return (
    <>
      <img src="/images/email.png" alt="" className="m-auto" />
      <h1 className="mb-2 mt-6 text-center text-2xl font-semibold">Confirm</h1>
      <p className="text-center">
        {`Please enter the code sent to "${enterEmail}" `}
      </p>
      <div className="mb-12 mt-6 flex justify-center">
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
          className="mb-12 mt-4 text-center text-sm text-[#71717A] underline"
          onClick={handleResendOtp}
        >
          Send code again ({countDown})
        </Button>
      </div>
    </>
  );
};

export default GetNewPass;
