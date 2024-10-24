import React from "react";
const DonationHero = () => {
  return (
    <section>
      <div
        style={{
          backgroundImage: `url("/images/amistad.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "60vh",
          position: "relative",
        }}
      >
        <h1 className=" text-white text-9xl flex justify-center">
          All paws need help
        </h1>
      </div>
    </section>
  );
};

export default DonationHero;
