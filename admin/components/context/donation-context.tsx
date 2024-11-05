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
  createDonationPost: () => {},
  getAllDonationPosts: () => {},
  getDonationPosts: [],
  setGetDonationPosts: () => {}
});

export const DonationProvider = ({ children }: DonationProviderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { setIsLoading } = useContext(ProfileContext);
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

  const createDonationPost = async () => {
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
        toast({
          variant: 'default',
          title: 'Successfully posted'
        });
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

  useEffect(() => {
    getAllDonationPosts();
  }, []);

  return (
    <DonationContext.Provider
      value={{
        donationPosts,
        setDonationPosts,
        getDonationPosts,
        setGetDonationPosts,
        createDonationPost,
        getAllDonationPosts
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
