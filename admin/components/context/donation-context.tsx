'use client';
import {
  DonationContextType,
  IDonationPost,
  IGetDonationPost
} from '@/app/interface';
import { createContext, useContext, useEffect, useState } from 'react';
import { ProfileContext } from './profile_context';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { PetsContext } from './pets-context';

type DonationProviderProps = {
  children: React.ReactNode;
};

export const DonationContext = createContext<DonationContextType>({
  donationPosts: {
    title: '',
    description: '',
    status: '',
    petId: '',
    images: [''],
    totalAmount: 0
  },
  setDonationPosts: (donationPosts: IDonationPost) => {},
  createDonationPost: (e: React.FormEvent) => {},
  getAllDonationPosts: () => {},
  getDonationPosts: [],
  setGetDonationPosts: () => {},
  deleteDonationPost: (id: string) => {},
  editDonationPost: (id: string) => {},
  isEdit: false,
  setIsEdit: () => {},
  getSingleDonationPost: (id: string | string[]) => {},
  editData: {
    _id: '',
    title: '',
    description: '',
    status: '',
    petId: {
      name: ''
    },
    images: [''],
    totalAmount: 0,
    created_at: new Date()
  },
  setEditData: (editData: IGetDonationPost) => {}
});

export const DonationProvider = ({ children }: DonationProviderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setIsLoading } = useContext(ProfileContext);
  const { refetch, setRefetch } = useContext(PetsContext);
  const [isEdit, setIsEdit] = useState(false);
  const [getDonationPosts, setGetDonationPosts] = useState<IGetDonationPost[]>([
    {
      _id: '',
      title: '',
      description: '',
      status: '',
      petId: {
        name: ''
      },
      images: [''],
      totalAmount: 0,
      created_at: new Date()
    }
  ]);
  const [donationPosts, setDonationPosts] = useState<IDonationPost>({
    title: '',
    description: '',
    status: '',
    petId: '',
    images: [''],
    totalAmount: 0
  });
  const [editData, setEditData] = useState<IGetDonationPost>({
    _id: '',
    title: '',
    description: '',
    status: '',
    petId: {
      name: ''
    },
    images: [''],
    totalAmount: 0,
    created_at: new Date()
  });

  const createDonationPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${apiUrl}/api/v1/donation/create`,
        {
          title: donationPosts.title,
          description: donationPosts.description,
          petId: donationPosts.petId,
          totalAmount: donationPosts.totalAmount,
          status: donationPosts.status,
          images: donationPosts.images
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        toast({
          variant: 'default',
          title: 'Successfully posted'
        });
        router.push('/dashboard/donation');
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

  const getAllDonationPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/donation`);
      if (res.status === 200) {
        setGetDonationPosts(res.data.allDonations);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create donation post'
      });
      console.error('Failed to create donation post:', error);
    }
  };

  const getSingleDonationPost = async (id: string | string[]) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/donation/${id}`);
      if (res.status === 200) {
        setEditData(res.data.getSinglePost);
      }
    } catch (error) {
      console.log('Err', error);
    }
  };

  const deleteDonationPost = async (id: string) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/donation/${id}`);
      if (res.status === 200) {
        console.log('Deleted successfully');
        toast({
          title: 'Deleted post successfully',
          description: `${new Date().toLocaleDateString()}`
        });
        setRefetch?.(!refetch);
      }
    } catch (error) {
      console.log('Failed to delete', error);
    }
  };

  const editDonationPost = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${apiUrl}/api/v1/donation/${id}`,
        {
          title: editData.title,
          description: editData.description,
          status: editData.status,
          totalAmount: editData.totalAmount,
          images: editData.images,
          petId: editData.petId.name
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        toast({
          title: 'Updated successfully',
          description: `${new Date().toLocaleDateString()}`
        });
        setRefetch?.(!refetch);
        router.push('/dashboard/donation');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error updating donation',
        description: 'Please try again'
      });
      console.log('Update err', error);
    }
  };

  useEffect(() => {
    getAllDonationPosts();
  }, [refetch]);

  return (
    <DonationContext.Provider
      value={{
        donationPosts,
        setDonationPosts,
        getDonationPosts,
        setGetDonationPosts,
        createDonationPost,
        getAllDonationPosts,
        deleteDonationPost,
        editDonationPost,
        isEdit,
        setIsEdit,
        getSingleDonationPost,
        editData,
        setEditData
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
