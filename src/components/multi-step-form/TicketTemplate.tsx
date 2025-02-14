import React from 'react';
import { ReactBarcode } from 'react-jsbarcode';
import ticketBackground from "../../assets/ticket-background.svg";

type TicketTemplateProps = {
    data: {
        name: string;
        email: string;
        ticketType: string;
        ticketCount: number;
        request?: string;
        image?: string
    };
};

const TicketTemplate = React.forwardRef<HTMLDivElement, TicketTemplateProps>(({ data }, ref) => {
    return (
        <div ref={ref} className="flex flex-col justify-center items-center relative /w-[300px] /h-[600px]  mx-auto font-roboto max-w-full  ">

            <div className=" relative w-full">
                <img src={ticketBackground} alt="" className="w-102 " />

                <div className="shrink absolute h-[68%] top-[3%] m-5 border border-primary-green rounded-lg p-4 md:p-5 w-[calc(100%-40px)] max-w-[21.5rem]">
                    <div className="flex flex-col justify-center items-center">
                        <EventDetail />
                        <img src={data?.image} alt="" className="w-24 h-24 md:w-32 md:h-32 mb-2 object-cover !rounded-lg upload-border" />
                    </div>

                    <div className="border-2 border-[#133D44] bg-[#08343C] p-2 rounded-lg font-roboto">
                        <div className="grid grid-cols-2">
                            {/* Name */}
                            <div className="flex flex-col text-[0.75rem] font-bold p-1 border-r border-[#12464E]">
                                <span className="text-gray font-normal text-[0.625rem]">Name</span>
                                <span className="text-[#fff]">{data?.name}</span>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col text-[0.75rem] font-bold p-1">
                                <span className="text-gray font-normal text-[0.625rem]">Email</span>
                                <span className="text-[#fff] break-words">{data?.email}</span>
                            </div>

                            {/* Ticket Type */}
                            <div className="flex flex-col text-[0.75rem] font-bold p-1 border-t border-b border-r border-[#12464E]">
                                <span className="text-gray font-normal text-[0.625rem]">Ticket Type</span>
                                <span className="text-[#fff] text-[0.625rem]">{data?.ticketType}</span>
                            </div>

                            {/* Ticket Count */}
                            <div className="flex flex-col text-[0.75rem] font-bold p-1 border-t border-b border-[#12464E]">
                                <span className="text-gray font-normal text-[0.625rem]">Ticket for:</span>
                                <span className="text-[#fff] text-[0.625rem]">{data?.ticketCount}</span>
                            </div>

                            {/* Special Request */}
                            <div className="col-span-2 flex flex-col text-[0.625rem] p-1">
                                <span className="text-gray font-normal text-[0.625rem]">Special Request:</span>
                                <span className="text-[#fff] text-[0.625rem]">{data?.request || 'No special requests'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[2%] flex w-full justify-center left-0 right-0">

                    <ReactBarcode
                        value={`TECH-${data?.ticketType}-${Date.now()}`}
                        options={{
                            font: "Roboto",
                            lineColor: "#fafafa",
                            background: "transparent",
                            format: "CODE128A",
                            width: 1,

                            margin: 0,
                            height: 70,
                        }}
                    />
                </div>
            </div>
        </div>
    );


});

const EventDetail = () => {
    return (
        <div className="flex flex-col text-center text-[#fafafa] mb-3 font-roboto">
            <h3 className="font-bold  text-2xl mb-1 font-rage">
                Techember Fest "25
            </h3>
            <p className="text-[0.625rem]">
                Join us for an unforgettable experience at [Event Name]! Secure your spot now.
            </p>
            <p className="flex flex-col gap-1 text-[0.625rem] justify-center">
                <span>📍04 Rumens road, Ikoyi, Lagos</span>
                <span>March 15, 2025 | 7:00 PM</span>
            </p>
        </div>
    );
};

export default TicketTemplate;
