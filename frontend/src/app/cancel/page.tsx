"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentCancel = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-290px)] bg-[#F8F9FA]">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h2>

        <p className="text-gray-600 mb-6">
          Your payment has been cancelled. If you have any questions, please
          contact our support team.
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={() => router.push("/donation")} variant="default">
            Return to Donations
          </Button>

          <Button onClick={() => router.push("/")} variant="outline">
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
