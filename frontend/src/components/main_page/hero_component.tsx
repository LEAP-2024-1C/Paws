import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroComponent = () => {
  return (
    <div className="bg-[#F8F9FA] w-full overflow-hidden">
      <section className="w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Section */}
          <motion.div
            className="flex-1 relative flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            {/* Decorative Images with floating animation */}
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              src="https://i.ibb.co/71DzHdF/shape.png"
              alt=""
              className="w-16 md:w-20 lg:w-28 absolute top-[-40px] left-4 md:left-20 hidden md:block"
            />
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              src="/img/parrot.png"
              alt=""
              className="w-20 md:w-28 lg:w-40 absolute top-8 right-4 md:right-12 hidden md:block"
            />

            {/* Content with staggered animation */}
            <motion.div
              className="flex flex-col gap-4 md:gap-6 lg:gap-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="flex flex-col gap-2 mt-10 md:mt-0 md:gap-3">
                <span className="text-[#FD7E14] text-sm md:text-base font-semibold">
                  Adopt A Pet
                </span>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Find your best new friend
                </h1>
              </div>
              <p className="text-sm md:text-base text-gray-600 max-w-md ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                tempora quia laboriosam?
              </p>
              <div className="flex ">
                <Link href="../adoption">
                  <Button className="w-36 md:w-40 text-sm md:text-base py-2 md:py-3">
                    Adopt Now
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              src="https://i.ibb.co/71DzHdF/shape.png"
              alt=""
              className="w-16 md:w-20 lg:w-28 absolute bottom-[-50px] right-4 md:right-20 hidden md:block"
            />
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex-1 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative mt-8 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <div
              style={{
                backgroundImage: "url('/images/image.png')",
              }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            />
            <img
              src="https://i.ibb.co/P51h23c/cat-dog.png"
              alt="Pets"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 md:w-3/4 object-contain"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroComponent;
