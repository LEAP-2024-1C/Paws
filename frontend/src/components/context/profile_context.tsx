"use client";
import React, { createContext, useEffect, useState } from "react";
import { ProfileContextType } from "@/interface";
import Loading from "@/components/recover_pass/loading";
import { apiUrl } from "@/utils/util";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

type ProfileProviderProps = {
  children: React.ReactNode;
};

export const ProfileContext = createContext<ProfileContextType>({
  isLoading: false,
  enterEmail: "",
  step: 1,
  countDown: 90,
  otpValue: "",
  setIsLoading: () => {},
  setEnterEmail: () => {},
  setStep: () => {},
  setCountDown: () => {},
  setOtpValue: () => {},
  handleEmail: (_e: React.ChangeEvent<HTMLInputElement>) => {},
  handleSend: async () => {},
  handleConfirmOtp: async (_otpValue: string) => {},
  handleResendOtp: async () => {},
});

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [enterEmail, setEnterEmail] = useState("");
  const [step, setStep] = useState(1);
  const [countDown, setCountDown] = useState(90);
  const [otpValue, setOtpValue] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnterEmail(e.target.value);
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/api/v1/auth/resend-pass`, {
        email: enterEmail,
      });
      if (response.status === 200) {
        toast.success("Mail sent successfully");

        setStep(step + 1);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Couldn't sent the email");
      console.log("errors", error);
    }
  };

  const handleConfirmOtp = async (value: string) => {
    setOtpValue(value);
    // console.log("VL", value.length);
    if (value.length === 4) {
      try {
        setIsLoading(true);
        const response = await axios.post(`${apiUrl}/api/v1/auth/verify-otp`, {
          email: enterEmail,
          otpValue: value,
        });
        if (response.status === 200) {
          toast.success("Mail sent successfully");
          router.push("/signin");
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("otp err", error);
        toast.error("Couldn't sent the otp");
      }
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const countdown = setInterval(() => {
        setCountDown((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [countDown]);

  if (isLoading) return <Loading />;

  const handleResendOtp = () => {
    setCountDown(30);
  };
  return (
    <ProfileContext.Provider
      value={{
        enterEmail,
        step,
        countDown,
        otpValue,
        isLoading,
        setIsLoading,
        setEnterEmail,
        setStep,
        setCountDown,
        setOtpValue,
        handleEmail,
        handleSend,
        handleConfirmOtp,
        handleResendOtp,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
