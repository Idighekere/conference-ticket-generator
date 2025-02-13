import React, { useRef, useState } from 'react'
import Button from '../ui/button'
import ticketBackground from "../../assets/ticket-background.svg"
import UserImage from "../../assets/User.img.png"
import Barcode from 'react-barcode'
import generatePDF from 'react-to-pdf';
import { clearFormData, saveTicketToCollection } from '../../utils/storage'
import TicketTemplate from './TicketTemplate'

type Props = {}

const Ready = ({ data }) => {

    const targetRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);



    const handleDownloadTicket = async () => {
        setIsGenerating(true);

        try {
            await generatePDF({
                element: ticketRef.current,
                filename: `ticket-${data.name}-${Date.now()}.pdf`,
                options: {
                    format: [300, 600],
                    unit: 'px',
                },
            });


            saveTicketToCollection(data);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }




    return (
        <div className='flex flex-col gap-3 mt-3 text-[#fafafa] /bg-[#08252b] p-3 '>

            <h3 className='text-2xl font-bold text-center font-alatsi'>Your Ticket is Booked!</h3>
            <p className="w text-center font-roboto">You can download or Check your email for a copy</p>


            {/* Hidden template for PDF generation */}
            <div style={{ position: 'absolute', left: '-9999px' }}>
                <TicketTemplate ref={targetRef} data={data} />
            </div>

            {/* Visible preview */}
            <div className="flex justify-center">
                <TicketTemplate ref={null} data={data} />
            </div>

            <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-10 mt-6'>
                <a href='/' className='w-full'>
                    <Button className="w-full" type="button" title='Book Another Ticket' variant='outline' onClick={() => saveTicketToCollection(data)} />
                </a>
                <Button className="w-full" type='button' title={isGenerating ? "Generating..." : "Download Ticket"} onClick={handleDownloadTicket} disabled={isGenerating}></Button>
            </div>
        </div>
    )
}
const EventDetail = () => {
    return <div className='flex flex-col text-white text-center  border-x-[#07373f] border-b-[#07373f] border-t-0 rounded-md /ticket-detail-image mb-3 '>
        <h3 className='font-bold text-white text-xl md:text-2xl '>Techember Fest ”25</h3>
        <p className='text-[0.625rem]'>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
        <p className='flex flex-col gap-1 text-[0.625rem] justify-center'><span>📍04 Rumens road, Ikoyi, Lagos</span> <span>March 15, 2025 | 7:00 PM</span></p>
    </div>
}
export default Ready
