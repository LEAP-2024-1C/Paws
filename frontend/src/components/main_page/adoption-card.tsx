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
       <div className='border rounded-xl' key={id}>
         <Image src={image} alt='card image' width={306} height={280}></Image>
         <div className='flex justify-between bg-slate-100 h-16 px-5 pt-3'>
         <h2 className='font-bold text-xl'>{name}</h2>
         <p className='w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center text-amber-600'>
         <FaArrowRight />
         </p>
        </div>
     </div>
  
  
  )
}

export default PetsCard