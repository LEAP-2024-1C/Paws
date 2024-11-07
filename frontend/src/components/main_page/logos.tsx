import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="grid grid-cols-2 p-4 sm:grid-cols-2 md:grid-cols-4 md:gap-8 lg:gap-20 items-center justify-items-center">
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
        className="w-24 sm:w-28 md:w-32 lg:w-36"
      />
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
        className="w-24 sm:w-28 md:w-32 lg:w-36"
      />
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
        className="w-24 sm:w-28 md:w-32 lg:w-36"
      />
      <Image
        src="https://i.pinimg.com/736x/fd/31/cd/fd31cd6b88cde40f062e890ea889d571.jpg"
        alt=""
        width={110}
        height={80}
        className="w-24 sm:w-28 md:w-32 lg:w-36"
      />
    </div>
  );
};

export default Logo;
