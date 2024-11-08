import { useContext, useState } from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

import { Fredoka } from 'next/font/google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { UserContext } from '../context/user_context';
import { useRouter } from 'next/navigation';

const fredoka = Fredoka({ subsets: ['latin'] });

const SigninForm = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [userForm, setUserForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: 'user',
    password: '',
    rePassword: ''
  });

  const handleSignIn = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email: userForm.email,
        password: userForm.password,
        login_type: 'admin'
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
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex items-center justify-center ">
        <div className="flex-1 p-8">
          <div className="mx-auto overflow-hidden">
            <div className="p-8 ">
              <h1
                className={`${fredoka.className} mb-7 text-5xl font-bold text-orange-500`}
              >
                Welcome back!
              </h1>
              <div className="mb-7 flex w-full items-center justify-evenly p-5">
                <FaFacebook className="icon w-[15%]" />
                <FaGoogle className="icon w-[15%]" />
              </div>

              <p className={`${fredoka.className} text-center text-gray-500`}>
                or use your email and password:
              </p>

              <div className="mt-12">
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2  border-gray-300 bg-transparent text-gray-900 placeholder-transparent  focus:border-indigo-600 focus:outline-none"
                    placeholder="john@doe.com"
                    value={userForm.email}
                    onChange={(e) => {
                      setUserForm({ ...userForm, email: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="email"
                    className={`${fredoka.className} absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600`}
                  >
                    Email
                  </label>
                </div>
                <div className="relative mt-10">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={(e) => {
                      setUserForm({ ...userForm, password: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`${fredoka.className} absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600`}
                  >
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign in"
                  onClick={handleSignIn}
                  className="mt-20 block w-full cursor-pointer rounded-full bg-orange-500 px-8 py-4 text-center font-semibold uppercase text-white hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-80 focus:ring-offset-2"
                />
              </div>
              <Link
                href="/recoverpass"
                className={`${fredoka.className} mt-4 block text-center text-sm font-medium text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                {' '}
                Forgot your password?{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SigninForm;
