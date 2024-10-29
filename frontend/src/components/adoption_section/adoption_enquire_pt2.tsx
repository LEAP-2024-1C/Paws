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
import { Label } from "@/components/ui/label";
import { GoArrowRight } from "react-icons/go";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export function AdoptionEnquirePt2() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">
          Next
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
        <div className="flex flex-col gap-8 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="firstname">1. Have you owned a pet before?</Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="r1" />
                <Label htmlFor="r2">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r2" />
                <Label htmlFor="r3">No</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="firstname">2. Do you currently own any pets?</Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="r3" />
                <Label htmlFor="r3">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dog" id="r4" />
                <Label htmlFor="r4">Dog(s)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cat" id="r5" />
                <Label htmlFor="r5">Cat(s)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dog_cat" id="r6" />
                <Label htmlFor="r6">Dog(s) and Cat(s)</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="firstname">
              3. How many members are in your household?
            </Label>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="r7" />
                <Label htmlFor="r7">1-2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="med" id="r8" />
                <Label htmlFor="r8">3-4</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="big" id="r9" />
                <Label htmlFor="r">4+</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstname" className="mb-2">
              4. What are the age ranges of the those in your household?
            </Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Under 5 years old
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                5-12
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                13-17
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                18+
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
