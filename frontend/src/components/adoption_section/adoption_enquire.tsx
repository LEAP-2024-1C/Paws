import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoArrowRight } from "react-icons/go";
import { Textarea } from "../ui/textarea";
import { AdoptionEnquirePt2 } from "./adoption_enquire_pt2";

export function AdoptionEnquire() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex shadow-md rounded-full bg-[#FD7E14] py-6 text-xl text-white">
          Start
          <GoArrowRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enquire</DialogTitle>
          <DialogDescription>
            Make changes to your enquiry here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Firstname
            </Label>
            <Input
              id="firstname"
              // defaultValue="lastname"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Lastname
            </Label>
            <Input
              id="lastname"
              // defaultValue="lastname"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              // defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phone"
              // defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Description
            </Label>
            <Textarea
              id="textarea"
              // defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <AdoptionEnquirePt2 />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
