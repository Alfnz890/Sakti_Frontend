import React from 'react'
// import PP from '../../assets/raw.png'
import parse from 'html-react-parser'

interface CardProps {
   id: number;
   title: string;
   image: string;
   description: string,
   date?: string
}

const Card: React.FC<CardProps> = (props: CardProps) => {

   return (
      <>
         <div className='p-[10px] rounded-[5px] max-w-[235px] shadow-md border'>
            <img src={props.image} className='w-full h-[125px] object-cover rounded-[5px]' />
            <div className="content pt-[10px]">
               <p className='line-clamp-1 text-[15px] font-medium'>{props.title}</p>
               <p className='text-[11px] text-lighter-grey-grey'>{props.date}</p>
               <p className='line-clamp-2 text-[12px] mt-[7px] text-light-grey'>{parse(props.description || "")}</p>
               <a href={`/detail/${props.id}`} className='bg-yellow-primer rounded-[5px] text-[12px] flex justify-center py-[7px] mt-[7px]'>More Details</a>
            </div>
         </div>
      </>
   )
}

export default Card