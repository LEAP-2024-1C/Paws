'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import Loading from '@/components/recover_pass/loading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';

const NewPassPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EnterNewPass />
    </Suspense>
  );
};
// Create a separate component that uses useSearchParams
const EnterNewPass = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resetToken = searchParams.get('resettoken');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: '',
    rePassword: ''
  });

  const createNewPass = async () => {
    const { password, rePassword } = userData;
    if (password !== rePassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/verify-password`,
        {
          password: password,
          resetToken
        }
      );
      if (response.status === 200) {
        toast.success('Changed password successfully');
        router.push('/signin');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('verify-pass error', error);
      toast.error("Couldn't change the password");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-[calc(100vh-290px)] justify-center bg-[#F8F9FA] dark:bg-[#121212]">
      <div className="mt-24 w-1/5">
        <h1 className="mb-8 text-center text-2xl font-semibold">
          Нууц үг сэргээх
        </h1>
        <Input
          type="password"
          className="flex h-9 grow items-center rounded-full border-none px-4 py-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Шинэ нууц үг"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <Input
          type="password"
          className="my-4 flex h-9 grow items-center rounded-full border-none px-4 py-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Шинэ нууц үг дахин оруулах"
          value={userData.rePassword}
          onChange={(e) => {
            setUserData({ ...userData, rePassword: e.target.value });
          }}
        />
        <ul className=" mb-4 flex list-disc flex-col gap-1 px-4 text-xs">
          <li className="">Том үсэг орсон байх</li>
          <li>Жижиг үсэг орсон байх</li>
          <li>Тоо орсон байх</li>
          <li>Тэмдэгт орсон байх</li>
        </ul>
        <div className="flex flex-col gap-12">
          <Button
            className="bg-[#FD7E14]"
            size="custom"
            onClick={createNewPass}
          >
            Үүсгэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPassPage;
