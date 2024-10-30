import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export interface MockType {
  cash: string;
}

import { CashButton } from "./chash_button";
// const mockData = ["10$", "15$", "20$", "25$"];
const mockD = [
  {
    cash: "5$",
  },
  {
    cash: "10$",
  },
  {
    cash: "15$",
  },
  {
    cash: "20$",
  },
  {
    cash: "25$",
  },

  {
    cash: "30$",
  },
];
export function PayCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#FD7E14] text-white">
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Help the dream come true</DialogTitle>
          <DialogDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam,
            cum?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid  grid-cols-3  w-3/5 mx-auto gap-6">
            {mockD?.map((c: MockType) => (
              <div className="col-span-1 row-span-1">
                <CashButton cash={c.cash} />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="Number" placeholder="Enter custom amount" />
            <Button type="submit">Next</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
