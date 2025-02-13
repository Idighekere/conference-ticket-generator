import * as yup from 'yup';

export const ticketSelectionSchema = yup.object().shape({
    ticketType: yup.string().required('Please select a ticket type'),
    ticketCount: yup
        .number()
        .required('Please select number of tickets')
        .min(1, 'At least 1 ticket is required')
        .max(5, 'Maximum 5 tickets allowed'),
});

export const attendeeDetailsSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    request: yup.string().optional(),
    image: yup.string().optional(),
});

export type TicketFormData = {
    ticketType: string;
    ticketCount: number;
    name: string;
    email: string;
    request?: string;
    image?: string;
};
