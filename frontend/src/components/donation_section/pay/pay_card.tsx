"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { DonationContext } from "@/components/context/donation_context";
import { useRouter } from "next/navigation";

export interface MockType {
  cash: string;
}

const mockD = [
  { cash: "$15" },
  { cash: "$30" },
  { cash: "$50" },
  { cash: "$100" },
  { cash: "$250" },
  { cash: "$500" },
];
const bankLogos = [
  {
    bankLogo:
      "https://play-lh.googleusercontent.com/Aw4bwCDJgAzu6AFAbbcfCFpheVMB6ZKiEM3JlrJ3cAM65fK-1QaTZZs_Vk4UFBzykQ",
  },
  {
    bankLogo:
      "https://play-lh.googleusercontent.com/9tUBesUsI4UIkpgO1MPIMLFvhDa_4vZE75TrVAUHFA7a0bJ7IIgeyh2r1QXs9VlmXmkX",
  },
  {
    bankLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9OWAoZ4ChNhfYTyI7Knf4kwOfRM3xI8EF6g&s",
  },
  {
    bankLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBCEuWnamoyP22Qe1Snf9LKEEwVjuK93k_KA&s",
  },
  { bankLogo: "https://d20ytcq1zkh3th.cloudfront.net/6powyvkm0uj682f.png" },
  {
    bankLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzoLAwUeLaczwD8YquehlTkLMVYsZTEBQfWg&s",
  },
];
export function PayCard({ id }: { id: string | string[] }) {
  const [step, setStep] = useState(1);
  const {
    insertTransactionData,
    setInsertTransactionData,
    createTransactionData,
  } = useContext(DonationContext);
  // console.log("iddddd", id);
  // console.log("itd", insertTransactionData);
  const router = useRouter();
  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FD7E14] text-white rounded-lg"
        >
          Donate
        </Button>
      </DialogTrigger>
      {step === 1 && (
        <DialogContent className="sm:max-w-[500px] transform transition-all duration-900 ease-in-out">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          </div>

          <div className="flex rounded-full bg-gray-100 p-1 mb-6">
            <button className="flex-1 rounded-full py-2 bg-white">
              ❤️ Donate
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {mockD?.map((c: MockType, i) => (
              <button
                className="p-4 border rounded-xl hover:bg-[#FD7E14] border-[#FD7E14] text-xl font-bold"
                key={i}
              >
                {c.cash}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                $
              </span>
              <Input
                type="number"
                placeholder="Enter custom amount"
                className="pl-8 py-6 text-lg rounded-xl"
                onChange={(e) => {
                  setInsertTransactionData({
                    ...insertTransactionData,
                    amount: Number(e.target.value),
                  });
                }}
              />
            </div>
          </div>

          <Button
            className="w-full rounded-xl bg-[#FD7E14] py-6 text-lg"
            onClick={() => {
              setStep(2);
            }}
          >
            Next
          </Button>

          <div className="flex justify-center gap-8 mt-6">
            {bankLogos?.map((e, i) => (
              <img
                key={i}
                src={`${e.bankLogo}`}
                alt="bankLogo"
                className="h-8 rounded-md"
              />
            ))}
          </div>
        </DialogContent>
      )}
      {step === 2 && (
        <DialogContent className="sm:max-w-[500px] transform transition-all duration-900 ease-in-out">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          </div>

          <div className="space-y-4">
            <div className="text-center text-lg font-medium mb-6">
              ❤️ Donating ${`${insertTransactionData.amount}`}
            </div>

            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg"
              // required
              // onChange={(e) => {
              //   setInsertTransactionData({
              //     ...insertTransactionData,
              //     email: e.target.value,
              //   });
              // }}
            />

            <textarea
              placeholder="Your Message"
              className="w-full rounded-lg border p-2 min-h-[100px]"
              onChange={(e) => {
                setInsertTransactionData({
                  ...insertTransactionData,
                  description: e.target.value,
                });
              }}
            />

            <Button
              className="w-full rounded-xl bg-[#FD7E14] py-6 text-lg text-white mt-6"
              onClick={() => {
                setStep(3);
                // router.replace(
                //   "https://checkout.stripe.com/c/pay/cs_test_a1B0g1tcJpCspk27CuIWEkgAent1FYFtXzQkCZiQK8zncPCMmRzD0DJwnl#fidkdWxOYHwnPyd1blpxYHZxWjA0VExJdUdVPVZUdFdjQj1uNzdRb2ZNZ0BKTkF1N01GVGJDZEYzZ1VnPGgwSXNqd21saH0wfHBMS3xMSmhEbEdoM2NGY05UNExzd3B9bzJBdW83d0FkPGJ8NTU3ZlEwdTI0bycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
                // );
              }}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      )}
      {step === 3 && (
        <DialogContent className="sm:max-w-[500px] transform transition-all duration-300 ease-in-out">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FD7E14]"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-center text-lg">Enter your payment details</h3>

            {/* Secure payment message */}
            <div className="bg-gray-50 p-4 rounded-lg flex gap-3">
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Secure payment</div>
                <div className="text-sm text-gray-500">
                  Our payments are protected by industry best-practice
                  encryption technology.
                </div>
              </div>
            </div>

            {/* Payment form */}
            <div className="space-y-4">
              <div className="flex relative">
                <Input
                  placeholder="Card number"
                  className="w-full rounded-lg"
                />
                <div className="flex gap-2 mt-1 absolute right-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2zdNlBjcvJec5Aq1c60qfwT-sWkyTpQgG8w&s"
                    alt="visa"
                    className="h-6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Expiration date" className="rounded-lg" />
                <Input placeholder="Security code" className="rounded-lg" />
              </div>

              <div>
                <Input
                  placeholder="Country"
                  className="w-full rounded-lg"
                  defaultValue="Mongolia"
                />
              </div>

              <div className="text-center text-sm">
                Donating ${`${insertTransactionData.amount}`} in United States
                Dollars
              </div>

              <Button
                className="w-full rounded-xl bg-[#FD7E14] py-6 text-lg text-white"
                onClick={() => {
                  createTransactionData(id);
                }}
              >
                Donate ${`${insertTransactionData.amount}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
