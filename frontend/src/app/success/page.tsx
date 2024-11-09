"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentSuccess = () => {
  const router = useRouter();

  return (
    <div className=" flex items-center justify-center min-h-[calc(100vh-290px)] bg-[#F8F9FA]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You for Your Donation!
        </h2>

        <p className="text-gray-600 mb-6">
          Your generous contribution has been received successfully. Together,
          we can make a difference in the lives of animals in need.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-500">
            A confirmation email will be sent to your registered email address
            shortly.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={() => router.push("/donation")} variant="default">
            Make Another Donation
          </Button>

          <Button onClick={() => router.push("/")} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
