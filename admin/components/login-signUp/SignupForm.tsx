'use client';
import { useContext, useEffect, useState } from 'react';
import { Fredoka } from 'next/font/google';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { ProfileContext } from '../context/profile_context';
import { apiUrl } from '@/utils/util';
import Loading from '../recover_pass/loading';

const fredoka = Fredoka({ subsets: ['latin'] });

const SignupForm = () => {
  const { isLoading, setIsLoading } = useContext(ProfileContext);
  const router = useRouter();
  const [userForm, setUserForm] = useState({
    email: '',
    firstname: '',
    lastname: '',
    role: 'user',
    password: '',
    rePassword: ''
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        setUserForm({
          email: 'johnny@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          role: 'admin',
          password: 'password123',
          rePassword: 'password123'
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleSignUp = async () => {
    const { firstname, lastname, email, password, rePassword } = userForm;
    if (password !== rePassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/api/v1/auth/signup`, {
        firstname,
        lastname,
        email,
        password,
        role: 'admin'
      });
      if (res.status === 201) {
        // console.log("res", res);
        toast.success('User signed up successfully');
        setIsLoading(false);
        router.push('/');
      }
    } catch (error) {
      // res.status(400).json({ message: "Failed to sign up. Please try again." });
      console.error('There was an error signing up:', error);
      setIsLoading(false);
      toast.error('Failed to sign up. Please try again.');
    }
  };

  const isPasswordValid = userForm.password.length >= 8;

  if (isLoading) return <Loading />;

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex items-center justify-center">
        <div className="flex-1 p-8">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1
                className={`mb-10 text-5xl font-bold text-orange-500 ${fredoka.className}`}
              >
                Create account
              </h1>

              <div className="mt-12">
                <div className="relative">
                  <input
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="Name"
                    value={userForm.lastname}
                    onChange={(e) => {
                      setUserForm({ ...userForm, lastname: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="name"
                    className={`${fredoka.className} absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600`}
                  >
                    Lastname
                  </label>
                </div>
                <div className="relative mt-8">
                  <input
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900  placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="Name"
                    value={userForm.firstname}
                    onChange={(e) => {
                      setUserForm({ ...userForm, firstname: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="name"
                    className={`${fredoka.className} absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600`}
                  >
                    Firstame
                  </label>
                </div>
                <div className="relative mt-8">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
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
                    Email address
                  </label>
                </div>
                <div className="relative mt-8">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900  placeholder-transparent focus:border-orange-600 focus:outline-none"
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
                <div className="relative mt-8">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-orange-600 focus:outline-none"
                    placeholder="Re-enter password"
                    value={userForm.rePassword}
                    onChange={(e) => {
                      setUserForm({ ...userForm, rePassword: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`${fredoka.className} absolute -top-3.5 left-0 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600`}
                  >
                    Re-enter password
                  </label>
                </div>
                <div className="my-4 flex flex-col gap-1 text-xs">
                  <div
                    className={
                      isPasswordValid ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    Password must be at least 8 characters long
                  </div>
                </div>

                <button
                  onClick={handleSignUp}
                  className={` ${fredoka.className} mt-20 block w-full cursor-pointer rounded-full bg-orange-500 px-8 py-4 text-center font-semibold uppercase text-white hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-80 focus:ring-offset-2`}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
