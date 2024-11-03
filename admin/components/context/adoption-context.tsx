'use client';
import { AdoptionReqContextType, IAdoptionRequest } from '@/app/interface';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { PetsContext } from './pets-context';

type AdoptionReqProviderProps = {
  children: React.ReactNode;
};

export const AdoptionReqContext = createContext<AdoptionReqContextType>({
  adoptionRequests: [],
  setAdoptionRequests: () => {},
  getAllAdoptionRequests: () => {},
  updateAdoptionRequest: (id: string, status: IAdoptionRequest['status']) => {}
});

export const AdoptionReqProvider = ({ children }: AdoptionReqProviderProps) => {
  const { refetch, setRefetch } = useContext(PetsContext);
  const [adoptionRequests, setAdoptionRequests] = useState<IAdoptionRequest[]>([
    {
      _id: '',
      description: '',
      title: '',
      previousPetOwnership: true,
      currentPets: true,
      householdMembers: true,
      ageRanges: {
        under5: false,
        age5to12: false,
        age13to17: false,
        age18plus: false
      },
      created_at: new Date(),
      status: 'pending',
      petId: { _id: '', name: '', breed: '' },
      userId: { _id: '', firstname: '', lastname: '', email: '' }
    }
  ]);

  const getAllAdoptionRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiUrl}/api/v1/adoption/req`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 200) {
        // console.log('RES', res.data);
        setAdoptionRequests(res.data.getAllRequests);
      }
    } catch (error) {
      console.log("Couldn't get adoption requests", error);
    }
  };

  const updateAdoptionRequest = async (
    id: string,
    status: IAdoptionRequest['status']
  ) => {
    try {
      await axios.patch(`${apiUrl}/api/v1/adoption/req/${id}`, {
        status
      });
      setRefetch?.(!refetch);
    } catch (error) {
      console.log('update err', error);
    }
  };

  useEffect(() => {
    getAllAdoptionRequests();
  }, [refetch]);

  // console.log('POSTS', adoptionRequests);

  return (
    <AdoptionReqContext.Provider
      value={{
        adoptionRequests,
        setAdoptionRequests,
        getAllAdoptionRequests,
        updateAdoptionRequest
      }}
    >
      {children}
    </AdoptionReqContext.Provider>
  );
};
