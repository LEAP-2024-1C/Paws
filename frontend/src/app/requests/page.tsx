"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroComponent from "@/components/main_page/hero_component";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { useToast } from "@/hooks/use-toast";

const Adoption_Donation_Requests = () => {
  const [myInquiries, setMyInquiries] = useState([
    {
      title: "",
      _id: "",
      petId: {
        name: "",
        imageUrl: "",
      },
      status: "",
      created_at: new Date(),
    },
  ]);
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "refused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-500";
    }
  };

  const getMyInquiries = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/api/v1/adoption/req/own`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setMyInquiries(res.data.getAllRequests);
        toast({
          title: "Success",
          description: "Inquiries fetched successfully",
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getMyInquiries();
  }, []);

  console.log("myInquiries", myInquiries);

  return (
    <div className="">
      <HeroComponent />
      <div className="my-24 m-auto w-3/5">
        <h1 className="text-2xl font-bold mb-6">My Inquiries</h1>
        <div className="space-y-4">
          {myInquiries?.map((inquiry) => (
            <Card key={inquiry._id} className="shadow-md">
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">{inquiry.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${getStatusColor(inquiry.status)}`}>
                  {inquiry.status.toUpperCase()}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adoption_Donation_Requests;
