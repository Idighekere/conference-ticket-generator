import { ChangeEvent, useRef, useState } from 'react'
import Button from '../ui/button'
import envelope from "../../assets/envelope.svg"
import upload from "../../assets/upload.svg"
import { saveFormData, uploadImage } from '../../utils/storage'
import { useFormik } from 'formik';
import { attendeeDetailsSchema, TicketFormData } from '../../constants/validationSchema'

type Props = {
    handleNext: () => void,
    handlePrev: () => void;
    data: TicketFormData;
    updateFormData: (data: Partial<TicketFormData>) => void
}

const AttendeeDetails = ({ handleNext, handlePrev, data, updateFormData }: Props) => {
    const formik = useFormik({
        initialValues: {
            name: data?.name || '',
            email: data?.email || '',
            request: data?.request || '',
            image: data?.image || '',
        },
        validationSchema: attendeeDetailsSchema,
        onSubmit: (values: Partial<TicketFormData>) => {
            updateFormData(values);
            saveFormData(values);
            handleNext();
        },
    });
    return (
        <div className='flex flex-col gap-3 mt-3 text-[#fafafa] bg-[#08252b] p-3 font-roboto'>
            <form className='flex flex-col gap-5 mt-2' onSubmit={formik.handleSubmit}>
                <AvatarUpload imageUrl={formik.values.image} setImageUrl={(type: ChangeEvent) => formik.setFieldValue('image', type)} />
                <span className='bg-border-green w-full h-[1px]' />


                <div className="flex flex-col">
                    <label htmlFor="name">Enter your name</label>
                    <input type="text" name="name" id="name" className={`outline-0 border-border-green border focus:ring-2 focus:ring-border-green bg-transparent rounded-md ${formik.errors.name && formik.touched.name && "border-red-600"}`} placeholder='Name' aria-placeholder='Name' value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    {formik.errors.name && formik.touched.name && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Enter your email<span className='text-red-600'> *</span></label>

                    <div className='flex items-center'>
                        <img src={envelope} alt="Envelope icon" aria-label='Envelope Icon' className='absolute items-center pl-2' />
                        <input type="email" name="email" id="email" className={`outline-0 border-border-green border focus:ring-2 focus:ring-border-green bg-transparent rounded-md relative pl-9 w-full ${formik.errors.email && formik.touched.email && "border-red-600"}`} placeholder='hello@example.com' aria-placeholder='Email address' value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="request">Special Request</label>
                    <textarea name="request" id="request" rows={3} className='outline-0 border-border-green border focus:ring-2 focus:ring-border-green bg-transparent rounded-md' placeholder='Text Area' aria-placeholder='Text Area' value={formik.values.request}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                </div>

                <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-10'>
                    <Button className="w-full" type="button" title='Back' variant='outline' onClick={handlePrev} />
                    <Button className="w-full" type='submit' title='Get My Free Ticket'  ></Button>
                </div>
            </form>

        </div>
    )
}
const AvatarUpload = ({ setImageUrl, imageUrl }: { setImageUrl: (type: ChangeEvent) => unknown; imageUrl: string }) => {

    const [, setImageFile] = useState<File | unknown>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const updateImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImageFile(file);
            const url = await uploadImage(file)
            setImageUrl(url)
            // console.log(url)
        }
    };
    const handleImageUploadClick = () => {
        fileInputRef.current?.click();

    };
    return <div className='background-gradient
        p-5 md:p-10 rounded-lg font-roboto'>
        <label htmlFor="image" className='mb-8 block'>Upload Profile Photo</label>
        <div className='bg-[#052228] border border-[#07373F] rounded-md h-[9.5rem] flex justify-center items-center cursor-pointer' onClick={handleImageUploadClick}>

            <div className={`upload-border w-[12rem] h-[12rem] items-center flex justify-center gap-4  flex-col ${imageUrl && "group relative"}`}>
                {imageUrl ? <img src={imageUrl} className='object-cover w-[12rem] h-[12rem] rounded-4xl group ' /> : (<div className='p-3 '><img src={upload} alt="cloud icon" />
                    <p className="">Drag & drop or click to upload</p></div>)}
                <div className='p-3 opacity-0 group-hover:opacity-100  z-50 absolute  upload-hover-overlay w-[12rem] h-[12rem] rounded-2xl transition-opacity flex justify-center flex-col items-center'>
                    <img src={upload} alt="cloud icon" className='w-20' />
                    <p className="text-cent">Drag & drop or click to upload</p></div>

            </div>

            <input type="file" name="image" ref={fileInputRef} className='hidden' onChange={updateImage} />

        </div>


    </div>
}
export default AttendeeDetails
