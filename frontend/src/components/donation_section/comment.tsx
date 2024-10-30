import React from "react";
import { Separator } from "../ui/separator";
// import Rating from "@mui/material/Rating";
import "@smastrom/react-rating/style.css";

const Comments = ({ com }: any) => {
  return (
    <div className="">
      <div className="w-[510px] mt-5">
        <div className="flex gap-2 mb-1">
          <span className="text-sm font-semibold">{com.user.firstname}</span>
        </div>
        <p className="text-sm text-[#71717A] mb-5">
          {/* Ваав материал ёстой гоё байна 😍 */}
          {com.comment}
        </p>
        <Separator className=" border-dashed" />
      </div>
    </div>
  );
};

export default Comments;
