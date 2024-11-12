import { AdoptionReqContext } from '@/components/context/adoption-context';
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
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export function ResDialogDemo({ id }: { id: string }) {
  const { resValue, setResValue } = useContext(AdoptionReqContext);
  const handleResValue = async () => {
    try {
      console.log('ID:', id);
      console.log('ResValue:', resValue);

      const res = await axios.post(`${apiUrl}/api/v1/adoption/req/${id}`, {
        response: resValue
      });

      console.log('Response:', res.data);
      toast.success('Submitted definition successfully');
    } catch (error) {
      toast.error('Failed to submit response');
    }
  };
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
              onChange={(e) => setResValue(e.target.value)}
            ></textarea>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="outline-solid">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="mt-2 bg-teal-700 text-white"
            onClick={handleResValue}
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
