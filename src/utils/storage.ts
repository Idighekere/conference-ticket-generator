import { TicketFormData } from "src/constants/validationSchema"

export type TicketData = {
    id: string;
    purchaseDate: string;
    name: string;
    email: string;
    ticketType: string;
    ticketCount: number;
    request?: string;
    status: 'active' | 'used' | 'expired';
    purchasedBy: string;
};

const KEY = 'formData'
const TICKETS_STORAGE_KEY = 'my_tickets';


export const saveTicketToCollection = (formData: any) => {
    try {
        const existingTickets = getMyTickets();

        const newTicket: TicketData = {
            id: `TECH-${Date.now()}`,
            purchaseDate: new Date().toISOString(),
            name: formData.name,
            email: formData.email,
            ticketType: formData.ticketType,
            ticketCount: formData.ticketCount,
            request: formData.request,
            status: 'active',
            purchasedBy: 'Idighekere' // You can make this dynamic based on user context
        };

        existingTickets.push(newTicket);
        localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(existingTickets));

        // Clear the form data after successful purchase
        localStorage.removeItem(KEY);

        return newTicket;
    } catch (error) {
        console.error('Error saving ticket:', error);
        throw error;
    }
};

export const getMyTickets = (): TicketData[] => {
    try {
        const tickets = localStorage.getItem(TICKETS_STORAGE_KEY);
        return tickets ? JSON.parse(tickets) : [];
    } catch (error) {
        console.error('Error getting tickets:', error);
        return [];
    }
};

export const deleteTicket = (ticketId: string) => {
    try {
        const tickets = getMyTickets();
        const filteredTickets = tickets.filter(ticket => ticket.id !== ticketId);
        localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(filteredTickets));
    } catch (error) {
        console.error('Error deleting ticket:', error);
        throw error;
    }
};

export const saveFormData = (data: Partial<TicketFormData>) => {
    try {

        const existingData = localStorage.getItem(KEY);
        const parsedData = existingData ? JSON.parse(existingData) : {};
        const newData = { ...parsedData, ...data };
        localStorage.setItem(KEY, JSON.stringify(newData));

    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

export const loadFormData = (): Partial<TicketFormData> => {
    try {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error loading form data:', error);
        return {};
    }
};



export const clearFormData = () => {
    return localStorage.removeItem(KEY)
}

//UPLOADING IMAGE TO CLOUDINARY

export const uploadImage = async (file: File) => {
    const cloudName = import.meta.env.VITE_APP_CLOUD_NAME
    const unsignedUploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;


    try {
        const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const fd = new FormData();
        fd.append('upload_preset', unsignedUploadPreset);
        fd.append('tags', 'browser_upload')

        fd.append('file', file);

        const response = await fetch(endpoint, {
            method: 'POST',
            body: fd,
        })
        const data = await response.json()
        console.log(data)

        // File uploaded successfully
        const url = data.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        const tokens = url.split('/');
        tokens.splice(-3, 0, 'w_150,c_scale');
        const img = new Image();
        img.src = tokens.join('/');
        img.alt = data.public_id;

        return data.url

    } catch (error) {
        console.error('Error uploading the file:', error);
    }
}
