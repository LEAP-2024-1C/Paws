import React, { useContext } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { DonationContext } from "../context/donation_context";

// export type ICard = {
//   id: number;
//   name: string;
//   image: string;
// };

const DonateCard = () => {
  const { donationPosts } = useContext(DonationContext);
  const donat = donationPosts.slice(0, 4);

  return (
    <>
      <Card className="md:my-10 pb-10">
        <CardHeader className="text-xl font-semibold">Donate</CardHeader>
        {donat?.map((c, i) => (
          <Link href="../donation" key={i}>
            <CardContent className="w-[400px] relative pb-2">
              <div className="h-40 overflow-hidden rounded-xl brightness-[.70] bg-blend-darken">
                <Image
                  src={c.images[0]}
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
