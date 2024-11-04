'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useContext } from 'react';
import { AdoptionReqContext } from '@/components/context/adoption-context';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface CellActionProps {
  id: string;
}

interface AgeRanges {
  under5: boolean;
  age5to12: boolean;
  age13to17: boolean;
  age18plus: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const { adoptionRequests } = useContext(AdoptionReqContext);
  const request = adoptionRequests.find((req) => req._id === id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adoption Request Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Applicant Information</h3>
            <p>
              <span className="mr-2"> Firstname:</span>
              <Badge className="text-sm">{request?.userId?.firstname}</Badge>
            </p>
            <p>
              <span className="mr-2"> Lastname:</span>
              <Badge className="text-sm">{request?.userId?.lastname}</Badge>
            </p>
            <p>
              <span className="mr-2"> Email:</span>
              <Badge className="text-sm">{request?.userId?.email}</Badge>
            </p>
          </div>

          {/* <div>
            <h3 className="font-semibold">Pet Information</h3>
            <p>Name: {request?.petId?.name}</p>
            <p>Breed: {request?.petId?.breed}</p>
          </div> */}

          <div className="space-y-1">
            <h3 className="font-semibold">Current Pets:</h3>
            <Badge className="text-sm">
              {request?.currentPets || 'None specified'}
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Household members:</h3>
            <Badge className="text-sm">
              {request?.householdMembers || 'None specified'}
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Previous Pet Ownership:</h3>
            <Badge className="text-sm">
              {request?.previousPetOwnership || 'None specified'}
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold">Age Ranges:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'under5' as keyof AgeRanges, label: '0-4' },
                { key: 'age5to12' as keyof AgeRanges, label: '5-12' },
                { key: 'age13to17' as keyof AgeRanges, label: '13-17' },
                { key: 'age18plus' as keyof AgeRanges, label: '18+' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      (request?.ageRanges && request.ageRanges[key]) || false
                    }
                    readOnly
                    className={`h-4 w-4 
                      rounded-full border-gray-300
                      p-1 accent-primary
                      focus:ring-primary focus:ring-offset-0`}
                  />
                  <Label>{label} years</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Description</h3>
            <p className="whitespace-pre-wrap">
              {request?.description || 'No description provided'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
