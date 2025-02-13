import React, { useRef, useState } from 'react'
import Button from '../ui/button'
import generatePDF, { Margin, Options } from 'react-to-pdf';
import { saveTicketToCollection } from '../../utils/storage'
import TicketTemplate from './TicketTemplate'


const Ready = ({ data }) => {

    const targetRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const options: Options = {
        filename: `ticket-${data.name}-${Date.now()}.pdf`,
        method: "save",
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            format: "A4",
            orientation: "portrait",
        },

    }


    const handleDownloadTicket = async () => {
        setIsGenerating(true);

        try {
            await generatePDF(targetRef, options)
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
export default Ready
