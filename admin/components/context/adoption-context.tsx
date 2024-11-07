'use client';
import {
  AdoptionContextType,
  IAdoptionRequest,
  IEditAdoptionPost,
  IFormData
} from '@/app/interface';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { PetsContext } from './pets-context';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { ProfileContext } from './profile_context';

type AdoptionProviderProps = {
  children: React.ReactNode;
};

export const AdoptionReqContext = createContext<AdoptionContextType>({
  adoptionRequests: [],
  setAdoptionRequests: () => {},
  getAllAdoptionRequests: () => {},
  updateAdoptionRequest: (id: string, status: IAdoptionRequest['status']) => {},
  editAdoptionPost: {
    _id: '',
    title: '',
    description: '',
    status: '',
    pet: {
      _id: '',
      name: ''
    },
    imgUrl: [''],
    location: ''
  },
  setEditAdoptionPost: () => {},
  getSingleAdoptionPost: (id: string | string[]) => {},
  editAdoptionPostFunc: (id: string) => {},
  formData: {
    title: '',
    description: '',
    petId: '',
    location: '',
    status: '',
    imgUrl: ['']
  },
  setFormData: () => {},
  addAdoptionPost: async (e: React.FormEvent) => {}
});

export const AdoptionReqProvider = ({ children }: AdoptionProviderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { refetch, setRefetch } = useContext(PetsContext);
  const { setIsLoading } = useContext(ProfileContext);
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

  const [editAdoptionPost, setEditAdoptionPost] = useState<IEditAdoptionPost>({
    _id: '',
    title: '',
    description: '',
    status: '',
    pet: {
      _id: '',
      name: ''
    },
    imgUrl: [''],
    location: ''
  });

  const [formData, setFormData] = useState<IFormData>({
    title: '',
    description: '',
    petId: '',
    location: '',
    status: '',
    imgUrl: ['']
  });

  const addAdoptionPost = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add validation
    if (!formData.petId || !formData.status) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select both a pet and a status'
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${apiUrl}/api/v1/adoption/create`,
        {
          title: formData.title,
          description: formData.description,
          pet: formData.petId,
          location: formData.location,
          status: formData.status,
          imgUrl: formData.imgUrl
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        toast({
          variant: 'default',
          title: 'Successfully posted'
        });
        router.push('/dashboard/adoption');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create adoption post'
      });
      console.error('Failed to create pet profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const getSingleAdoptionPost = async (id: string | string[]) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/adoption/${id}`);
      if (res.status === 200) {
        setEditAdoptionPost(res.data.getOnePost);
        // console.log('adatas', res.data.getOnePost);
      }
    } catch (error) {
      console.log('Err', error);
    }
  };

  const editAdoptionPostFunc = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${apiUrl}/api/v1/adoption/${id}`,
        {
          title: editAdoptionPost.title,
          description: editAdoptionPost.description,
          status: editAdoptionPost.status,
          location: editAdoptionPost.location,
          imgUrl: editAdoptionPost.imgUrl,
          pet: editAdoptionPost.pet._id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast({
          title: 'Updated successfully',
          description: `${new Date().toLocaleDateString()}`
        });
        setRefetch?.(!refetch);
        router.push('/dashboard/adoption');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error updating adoption',
        description: 'Please try again'
      });
      console.log('Update err', error);
    }
  };

  useEffect(() => {
    getAllAdoptionRequests();
  }, [refetch]);

  return (
    <AdoptionReqContext.Provider
      value={{
        adoptionRequests,
        setAdoptionRequests,
        getAllAdoptionRequests,
        updateAdoptionRequest,
        editAdoptionPost,
        setEditAdoptionPost,
        getSingleAdoptionPost,
        editAdoptionPostFunc,
        addAdoptionPost,
        formData,
        setFormData
      }}
    >
      {children}
    </AdoptionReqContext.Provider>
  );
};
