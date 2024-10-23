import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

export type Card = {
  id: number;
   name: string;
   image: string;
 };

const PetsCard = ({name, image, id}: Card) => {
  return (
        <div className='h-60 w-80 border rounded-xl' key={id}>
        <Image src={image} alt='card image' width={306} height={280}></Image>
        <div className='flex justify-between border rounded-xl bg-slate-300 h-20'>
        <h2 className='font-bold text-2xl'>{name}</h2>
        <p className='w-8 h-8 border rounded-full bg-slate-200 flex justify-center items-center text-amber-600'>
        <FaArrowRight />
        </p>
        </div>
     </div>
  
  
  )
}

export default PetsCard