'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '@/components/context/user_context';

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [userF, setUserF] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email: userF.email,
        password: userF.password
      });
      if (res.status === 201) {
        toast.success('User signed in successfully');
        const { token } = res.data;
        setUser(res.data.user);
        localStorage.setItem('token', token);
        router.push('/dashboard');
      }
      // console.log("res", res);
    } catch (error) {
      console.error('There was an error signing in:', error);
      toast.error('Failed to sign in. Please try again.');
    }
  };
  return (
    <div className="flex h-[calc(100vh-290px)] items-center justify-center bg-gray-100 dark:bg-[#121212]">
      <div className="w-1/5">
        <h1 className="mb-8 text-center text-2xl font-semibold">Нэвтрэх</h1>
        <Label className="flex h-9 items-center gap-2 rounded-full bg-white px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <Input
            type="text"
            className="h-9 grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Email"
            value={userF?.email}
            onChange={(e) => {
              if (userF) setUserF({ ...userF, email: e.target.value });
            }}
          />
        </Label>
        <Label className="my-4 flex h-9 items-center gap-2 rounded-full bg-white px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70 "
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <Input
            type="password"
            placeholder="********"
            className="h-9 grow border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={userF?.password}
            onChange={(e) => {
              if (userF) setUserF({ ...userF, password: e.target.value });
            }}
          />
        </Label>
        <div className="flex flex-col">
          <Button className="bg-[#FD7E14]" size="custom" onClick={handleSignIn}>
            Нэвтрэх
          </Button>
          <Link
            href="/recoverpass"
            className="mb-12 mt-4 text-center text-sm text-[#71717A] underline"
          >
            Нууц үг мартсан
          </Link>
          <Button
            variant={'outline'}
            className="border-[#FD7E14]"
            size="custom"
          >
            <Link href="/signUp">Бүртгүүлэх</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
