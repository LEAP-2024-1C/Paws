"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import { DonationContext } from "@/components/context/donation_context";
import { UserContext } from "@/components/context/user_context";

export interface MockType {
  cash: number;
}

const mockD = [
  { cash: 15 },
  { cash: 30 },
  { cash: 50 },
  { cash: 100 },
  { cash: 250 },
  { cash: 500 },
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
  console.log("ID", id);
  const {
    insertTransactionData,
    setInsertTransactionData,
    createTransactionData,
  } = useContext(DonationContext);
  const { user } = useContext(UserContext);

  const [selectedMockAmount, setSelectedMockAmount] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (user) {
      setInsertTransactionData((prev) => ({
        ...prev,
        userName: user.firstname || prev.userName,
        description:
          `Donation from ${user.firstname} ${user.lastname}` ||
          prev.description,
      }));
    }
  }, [user]);

  const handleMockAmountClick = (amount: number) => {
    setSelectedMockAmount(amount);
    setInsertTransactionData((prev) => ({
      ...prev,
      amount: amount,
    }));
    setStep(2); // Skip to step 2 directly
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setStep(1);
      }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#FD7E14] text-white rounded-lg">
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
            {mockD?.map((amount, index) => (
              <button
                key={index}
                onClick={() => handleMockAmountClick(amount.cash)}
                className={`p-4 text-xl font-bold rounded-xl border border-[#FD7E14] ${
                  selectedMockAmount === amount.cash
                    ? "bg-primary "
                    : "hover:bg-[#FD7E14] "
                }`}>
                ${amount.cash}
              </button>
            ))}
          </div>

          <div className="relative">
            <p className="text-sm text-gray-500 mb-2">
              Or enter custom amount:
            </p>
            <Input
              type="number"
              placeholder="Enter amount"
              value={insertTransactionData.amount || ""}
              onChange={(e) => {
                setSelectedMockAmount(null); // Clear selected mock amount
                setInsertTransactionData({
                  ...insertTransactionData,
                  amount: parseFloat(e.target.value),
                });
              }}
            />
          </div>

          <Button
            className="w-full rounded-xl bg-[#FD7E14] py-6 text-lg"
            onClick={() => {
              setStep(2);
            }}>
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
              type="name"
              placeholder="Your Name"
              className="w-full rounded-lg"
              required
              value={insertTransactionData.userName}
              onChange={(e) => {
                setInsertTransactionData({
                  ...insertTransactionData,
                  userName: e.target.value,
                });
              }}
            />

            <textarea
              placeholder="Your Message"
              value={insertTransactionData.description}
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
                createTransactionData(id);
                // setStep(3);
                // router.replace(
                //   "https://checkout.stripe.com/c/pay/cs_test_a1B0g1tcJpCspk27CuIWEkgAent1FYFtXzQkCZiQK8zncPCMmRzD0DJwnl#fidkdWxOYHwnPyd1blpxYHZxWjA0VExJdUdVPVZUdFdjQj1uNzdRb2ZNZ0BKTkF1N01GVGJDZEYzZ1VnPGgwSXNqd21saH0wfHBMS3xMSmhEbEdoM2NGY05UNExzd3B9bzJBdW83d0FkPGJ8NTU3ZlEwdTI0bycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
                // );
              }}>
              Donate ${`${insertTransactionData.amount}`}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
