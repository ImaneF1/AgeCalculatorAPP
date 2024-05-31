"use client"
import * as React from 'react'
import Form from '../components/Form'
import InputField from '../components/InputField'
import Image from 'next/image'
import InputFields from '../components/InputFields'

export default function Home() {
  

  return (
  
    <div role="main" className="w-[100%] mx-auto mt-[40%] flex flex-col justify-center items-center
      rounded-3xl overflow-hidden p-4  md:w-[40%] md:mt-[5%]">
     
      <Form />
      
    
     
    
    <footer className='text-center text-xs mt-[25%] text-gray-500' >
    
      </footer>
    <button>
    <Image src="/icon-arrow.svg" width={20} height={20} alt="arrow" />
    </button>
    </div>
  
  )}
