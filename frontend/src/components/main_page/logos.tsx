import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-40 h-60">
      <Image src="/img/Logo.png" alt="" width={110} height={80}></Image>
      <Image src="/img/Logo (1).png" alt="" width={110} height={80}></Image>
      <Image src="/img/Logo (2).png" alt="" width={110} height={80}></Image>
      <Image src="/img/Logo (3).png" alt="" width={110} height={80}></Image>
      <Image src="/img/Logo (4).png" alt="" width={110} height={80}></Image>
    </div>
  );
};

export default Logo;
