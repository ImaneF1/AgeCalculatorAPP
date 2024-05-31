

"use client";

import React, { useState } from 'react';
import Image from "next/image";



//Add type definition for the form fields
interface FormValues {
    date: number;
    month: number;
    year: number;
}

export default function AgeForm() {

    const [formValues, setFormValues] = useState<FormValues>({
        date: 0,
        month: 0,
        year: 0,
    });

    const [age, setAge] = useState<{ years: number; months: number; days: number }>({
        years: '--',
        months: '--',
        days: '--',
    });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value, 
        }));
    };
    

  
    
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validate the form
        const { isValid, errors } = validateForm(formValues);

        if (isValid) {
            // form submit logic 
            const today = new Date();
            const birthdate = new Date(
                formValues.year,
                formValues.month - 1,
                formValues.date
            );

            const diffInMs = today.getTime() - birthdate.getTime();
            const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365.25));
            const diffInMonths = Math.floor(
                (diffInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12))
            );
            const diffInDays = Math.floor(
                (diffInMs % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24)
            );
            console.log(`You are ${diffInYears} years, ${diffInMonths} months, and ${diffInDays} days old`);
            setAge({ years: diffInYears, months: diffInMonths, days: diffInDays });

            setErrors([]);
        }
        else {
            setErrors(errors);
        }
    };

    const validateForm = (values: FormValues) => {
        const errors: string[] = [];
    
        if (!values.date || !values.month || !values.year) {
            errors.push('All fields are required'); 
                     
            return { isValid: false, errors };

        }
        // check if the day is between 1-31
        const day = Number(values.date);
        if (day < 1 || day > 31) {
            errors.push('Day must be between 1-31');

        }
        // check if the month is between 1-12
        const month = Number(values.month);
        if (month < 1 || month > 12) {
            errors.push('Month must be between 1-12');

        }
        // check if the year is in the future
        const year = Number(values.year);
        const currentYear = new Date().getFullYear();
        if (year > currentYear) {
            errors.push('Year cannot be in the future');

        }
        // check if the date is valid
        const isValidDate = (d: number, m: number, y: number) =>
            m > 0 && m <= 12 && d > 0 && d <= new Date(y, m, 0).getDate();
        if (!isValidDate(day, month, year)) {
            errors.push('The date is invalid');

        }
        // if all checks passed, the form is valid
        const isValid = errors.length === 0;
        return { isValid, errors };
    };

//if one field is empty, the form is invalid
const isValid = errors.length === 0;



        
        


    return (
        <div 
         className="flex flex-col justify-center items-center h-screen bg-OffWhite">
            
        
            <form onSubmit={handleSubmit} >
                <section id="input" className=' flex justify-between'>

                    <div>
                        <label htmlFor="date"
                            className='w-[80%] block mx-auto font-semibold  text-SmokeyGrey'>DAY</label>
                        <input
                            placeholder='DD'
                            id="date"
                            name="date"
                            onChange={handleChange}
                            className=' w-[80%] block border-2 mx-auto rounded-md font-semibold text-OffBlack p-2'
                        />
                         


                    </div>

                    <div >
                        <label htmlFor="month" className='w-[80%] block mx-auto font-semibold text-SmokeyGrey '>MONTH</label>

                        <input
                            placeholder='MM'
                            id="month"
                            name="month"
                            onChange={handleChange}
                            className='w-[80%] border-2 block mx-auto rounded-md font-semibold text-OffBlack p-2'
                        />
                        
                    </div>

                    <div >
                        <label htmlFor="year" className='w-[80%] block mx-auto  font-semibold text-SmokeyGrey '>YEAR</label>
                        <input
                            placeholder='YYYY'
                            id="year"
                            name="year"
                            onChange={handleChange}
                            className='w-[80%] border-2 block mx-auto rounded-md font-semibold text-OffBlack text-xl p-2'
                        />
                       

                     
                    </div>
                </section>
                
               

                <span>
                        {errors.length > 0 && (
                        <ul 
            className='block w-[80%] mx-auto text-center text-LightRed italic'>
                        {errors.map((error, index) => {
                        return <li key={index}>*{error}</li>;
                        })}
                    </ul>
                )}
                </span>
                
            <div className='md:mt-8 mt-16 border-t border-neutral-light-grey'>

            </div>

           
            <button className='bg-Purple block bg-primary-purple p-4 rounded-full md:ml-auto md:mr-0  mx-auto md:-mt-8 md:mb-0 -mt-8 mb-8'>
            <Image 
            className='w-9 md:w-8 lg:w-6'
            src="/icon-arrow.svg" 
            width={20} 
            height={20} 
            alt="arrow"
             />
            
          </button>
            </form>
            
           
            <section id="output" className="flex flex-col  gap-4 font-sans-serif h-screen   items-center bg-off-white">
      <div className="md:w-[45%] bg-white p-8 rounded-xl rounded-br-[10rem] flex-grow-1">
                <p className='md:text-6xl text-5xl font-black italic'>
                    <span className='text-Purple mr-2'>{age.years}</span>years</p>
                <p className='md:text-6xl text-5xl font-black italic'>
                    <span className='text-Purple mr-2'>{age.months}</span> months</p>
                <p className='md:text-6xl text-5xl font-black italic'>
                    <span className='text-Purple mr-2'>{age.days}</span> days</p>

                    </div>
            </section>
        
    
       </div>
    )
}