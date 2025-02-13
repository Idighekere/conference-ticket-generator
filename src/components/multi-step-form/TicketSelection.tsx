import React from 'react'
import Button from '../ui/button'
import { useFormik } from 'formik';
import { TicketFormData, ticketSelectionSchema } from '../../constants/validationSchema';
import { saveFormData } from '../../utils/storage';

type Props = {
    handleNext: () => void,
    data: TicketFormData;
    updateFormData: (data: Partial<TicketFormData>) => void
}

const ticketType = [
    {
        id: 1,
        price: "Free",
        type: "Regular",
        totalQuantity: 50,
        quantityLeft: 45,
    },
    {
        id: 2,
        price: "$150",
        type: "VIP",
        totalQuantity: 50,
        quantityLeft: 10,
    },
    {
        id: 3,
        price: "$150",
        type: "VVIP",
        totalQuantity: 50,
        quantityLeft: 20,
    },
]

const TicketSelection = ({ handleNext, data, updateFormData }: Props) => {




    const formik = useFormik({
        initialValues: {
            ticketCount: data?.ticketCount || 1,
            ticketType: data?.ticketType || ticketType[0].type || "Regular"
        },
        validationSchema: ticketSelectionSchema,
        onSubmit: (values) => {
            updateFormData(values)
            saveFormData(values)
            handleNext()
        }
    })




    return (
        <div className='flex flex-col gap-3 mt-3 text-[#fafafa] bg-[#08252b] p-3'>
            <TicketImage />
            <span className='bg-border-green w-full h-[1px]' />
            <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor='ticketType'>Select Ticket Type:</label>
                    {formik.errors.ticketType && formik.touched.ticketType && (
                        <div className="text-red-500 text-sm">{formik.errors.ticketType}</div>
                    )}
                </div>
                <div className='flex flex-col md:flex-row gap-3 md:gap-5 bg-[#052228] p-2 md:p-4 rounded-md w-full md:grid grid-cols-3'>

                    {
                        ticketType.map((ticket) => <TicketTypeOption ticket={ticket} key={ticket.id} selectedTicket={formik.values.ticketType}
                            handleTicketSelection={(type) => formik.setFieldValue('ticketType', type)} />)
                    }
                </div>

                <div>
                    <label htmlFor="numberOfTicket">Number of Tickets: </label>
                    <select name="ticketCount" id="numberOfTicket" className='bg-transparent w-full rounded-md border-border-green border' value={formik.values.ticketCount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}>
                        {[...Array(5)].map((_, i) => (
                            <option key={i + 1} value={i + 1} className="bg-transparent text-black">
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    {formik.errors.ticketCount && formik.touched.ticketCount && (
                        <div className="text-red-500 text-sm">{formik.errors.ticketCount}</div>
                    )}

                </div>
                <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-10'>
                    <Button className="w-full" type="reset" title='Cancel' variant='outline' onClick={() => formik.resetForm} />
                    <Button className="w-full" type='submit' title='Next' ></Button>
                </div>

            </form>
        </div>
    )
}


const TicketImage = () => {

    return <div className='flex flex-col text-white text-center border-2 border-x-[#07373f] border-b-[#07373f] border-t-0 rounded-md ticket-detail-image p-3'>
        <h3 className='font-bold text-white text-xl md:text-2xl'>Techember Fest ”25</h3>
        <p>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
        <p className='flex gap-1 text-sm justify-center'><span>📍 [Event Location]</span> || <span>March 15, 2025 | 7:00 PM</span></p>
    </div>
}

const TicketTypeOption = ({ ticket, selectedTicket, handleTicketSelection }) => {

    return (
        <div className={`p-2 md:p-5 border-border-green border-2 rounded-lg font-roboto hover:bg-[#2C545B] ${selectedTicket === ticket.type ? "bg-[#12464e]" : "border-border-green"
            }`}
            onClick={() => handleTicketSelection(ticket.type)}
        >
            <h3 className=' font-[600] text-[18px] md:text-[1.5rem] '>{ticket.price}</h3>
            <p className='uppercase text-base'>{ticket.type} Access</p>
            <p className='text-gray font-sm'>{ticket.quantityLeft}/{ticket.totalQuantity}</p>

        </div>
    )
}
export default TicketSelection
