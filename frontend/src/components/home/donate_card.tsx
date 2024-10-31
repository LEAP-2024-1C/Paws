import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Cards } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";

export type ICard = {
  id: number;
  name: string;
  image: string;
};

const DonateCard = () => {
  return (
    <>
      <Card className="md:my-10 pb-10">
        <CardHeader className="text-xl font-semibold">Donate</CardHeader>
        {Cards.map((c: ICard) => (
          <Link href="../donation">
            <CardContent className="w-[400px] relative pb-2">
              <div className="h-40 overflow-hidden rounded-xl brightness-[.70] bg-blend-darken">
                <Image
                  src="https://i.pinimg.com/736x/f8/98/55/f8985511417fca41f90dc399518a9fcf.jpg"
                  alt="img"
                  height={30}
                  width={400}
                  className="bg-center"
                ></Image>
              </div>
              <Button
                className="absolute z-20 left-40 bottom-7"
                variant="outline"
              >
                Donate
              </Button>
            </CardContent>
          </Link>
        ))}
      </Card>
    </>
  );
};

export default DonateCard;
