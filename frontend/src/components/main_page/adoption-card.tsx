import Image from 'next/image'
import React from 'react'

const PetsCard = ({name, image}: any) => {
  return (

        <div >
        <Image src={image} alt='card image' width={300} height={300}></Image>
        <h2 className='font-bold text-2xl'>{name}</h2>
        <div>
         <h3>name</h3>
        </div>
     </div>
  
  
  )
}

export default PetsCard