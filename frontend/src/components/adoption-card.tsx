import Image from 'next/image'
import React from 'react'
import {Cards } from "@/lib/data";



interface Card {
    id: number;
    image: "";
    name: string;
}

interface PetsCardProps {
    Cards: Card[];
}


const PetsCard = () => {
  return (
    {Cards.map((card: Card) => (
        <div key={card.id}>
        <Image src={card.image} alt='card image' width={300} height={300}></Image>
        <h2 className='font-bold text-2xl'>{card.name}</h2>
        <div>
         <h3>name</h3>
        </div>
     </div>
    ))}
  
  )
}

export default PetsCard