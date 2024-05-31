import Image from "next/image"
import Form from "./Form"
import InputField from "./InputField"

function InputFields({
    ...props
}) {
    const {errors} = props
    
    return (
        <>
        <div className="flex gap-6">
            <InputField name='day'>
                {errors.isInvalidDay && (
                    <p>Invalid Day</p>
                )}
            </InputField>

            <InputField name='month'>
                {errors.isInvalidMonth && (
                    <p>Invalid Month</p>
                )}
            </InputField>

            <InputField name='year'>
                {errors.isInvalidYear && (
                    <p>Invalid Year</p>
                )}
            </InputField>
        </div>
        

                <button className="bg-Purple block rounded-full p-2 mx-auto my-[10%]">
                    <Image src="/icon-arrow.svg" width={20} height={20} alt="arrow" />
                </button >
        </>
    )
}

export default InputFields