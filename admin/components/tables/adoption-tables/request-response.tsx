import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function ResDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="outline outline-blue-200">
          Definition
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Request response</AlertDialogTitle>
          <AlertDialogDescription>
            <textarea
              name="res"
              id=""
              className="bor my-10 w-96 rounded-md border border-black p-2"
              placeholder="Type your definition here"
            ></textarea>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="outline-solid">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="mt-2 bg-teal-700 text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
