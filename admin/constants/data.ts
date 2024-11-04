import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Pets = {
  id: number;
  name: string;
  breed: string;
  age: number;
  images: [string];
  gender: string;
  healthCon: string;
};
export const pets: Pets[] = [
  {
    id: 1,
    name: 'Ted',
    breed: 'husky',
    age: 2,
    images: ['img'],
    gender: 'male',
    healthCon: 'healthy'
  },
  {
    id: 1,
    name: 'Kitty',
    breed: 'bengal',
    age: 3,
    images: ['img'],
    gender: 'female',
    healthCon: 'healthy'
  }
];

export type Product = {
  [x: string]: any;
  _id: number;
  name: string;
  category: {
    name: string;
  };
  price: number;
  quantity: number;
  images: string[];
  description: string;
};

export type adoptionPostss = {
  id: number;
  userName: string;
  petName: string;
  description: string;
};

export const adoptionPostss: adoptionPostss[] = [
  {
    id: 1,
    userName: 'John Doe',
    petName: 'Kitty',
    description: 'I want to adopt Kitty'
  },
  {
    id: 2,
    userName: 'John Doe',
    petName: 'Max',
    description: 'I want to adopt Max'
  }
];
export const articlesHistory: ArticlesHistory[] = [
  {
    id: 1,
    author: 'Amy Harris',
    catName: 'Pet Health',
    title: 'Dog health',
    date: '24 May,2024'
  },
  {
    id: 2,
    author: 'Amy Harris',
    catName: 'Pet Care',
    title: 'Interesting fact about dogs',
    date: '23 May,2024'
  }
];

export type DonationPosts = {
  id: number;
  userName: string;
  petName: string;
  amount: number;
  description: string;
};

export type ArticlesHistory = {
  id: number;
  author: string;
  catName: string;
  title: string;
  date: string;
};
export const donationPosts: DonationPosts[] = [
  {
    id: 1,
    userName: 'John Doe',
    petName: 'Kitty',
    amount: 500000,
    description: 'I want to adopt Kitty'
  },
  {
    id: 2,
    userName: 'John Doe',
    petName: 'Max',
    amount: 200000,
    description: 'I want to adopt Max'
  }
];

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Pets',
    href: '/dashboard/pets',
    icon: 'pet',
    label: 'pets'
  },
  {
    title: 'Product',
    href: '/dashboard/product',
    icon: 'product',
    label: 'product'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  {
    title: 'Adoption',
    href: '/dashboard/adoption',
    icon: 'adoption',
    label: 'adoption'
  },
  {
    title: 'Donation',
    href: '/dashboard/donation',
    icon: 'donation',
    label: 'donation'
  },
  {
    title: 'Articles',
    href: '/dashboard/articles',
    icon: 'donation',
    label: 'login'
  },
  {
    title: 'SOS',
    href: '/dashboard/sos',
    icon: 'spinner',
    label: 'sos'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];

export type SOS = {
  id: number;
  userName: string;
  location: string;
  description: string;
  status: 'pending' | 'resolved';
  dateReported: string;
};

export const sosReports: SOS[] = [
  {
    id: 1,
    userName: 'Sarah Parker',
    location: '123 Main Street, Cityville',
    description: 'Injured stray dog needs immediate medical attention',
    status: 'pending',
    dateReported: '2024-03-20'
  },
  {
    id: 2,
    userName: 'Mike Thompson',
    location: '45 Park Avenue, Downtown',
    description: 'Cat stuck in tree, needs rescue',
    status: 'resolved',
    dateReported: '2024-03-19'
  }
];
