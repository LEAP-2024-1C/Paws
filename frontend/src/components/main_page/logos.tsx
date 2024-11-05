import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-40 h-60">
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
      ></Image>
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
      ></Image>{" "}
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
      ></Image>{" "}
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
      ></Image>
    </div>
  );
};

export default Logo;
