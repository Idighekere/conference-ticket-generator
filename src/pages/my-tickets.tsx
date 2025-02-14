import { useState, useEffect } from 'react';
import { getMyTickets, TicketData, deleteTicket } from '../utils/storage';
import Button from '../components/ui/button';

const MyTickets = () => {
    const [tickets, setTickets] = useState<TicketData[]>([]);
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'used' | 'expired'>('all');

    useEffect(() => {
        const loadTickets = () => {
            const savedTickets = getMyTickets();
            setTickets(savedTickets);
        };

        loadTickets();
    }, []);

    const filteredTickets = tickets.filter(ticket =>
        filterStatus === 'all' ? true : ticket.status === filterStatus
    );

    const handleDeleteTicket = (ticketId: string) => {
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            deleteTicket(ticketId);
            setTickets(prev => prev.filter(ticket => ticket.id !== ticketId));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6 font-roboto text-[#fafafa]">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold  font-jeju">My Tickets</h1>
                    <div className="flex gap-2">
                        {(['all', 'active', 'used', 'expired'] as const).map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-lg capitalize ${filterStatus === status
                                    ? 'bg-primary-green text-gray'
                                    : 'bg-[#08343C] text-gray/90'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTickets.map(ticket => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            onDelete={handleDeleteTicket}
                        />
                    ))}
                </div>

                {filteredTickets.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray/80">No tickets found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const TicketCard = ({
    ticket,
    onDelete
}: {
    ticket: TicketData;
    onDelete: (id: string) => void;
}) => {
    return (
        <div className="bg-[#08343C] rounded-lg p-4 border border-primary-green text-neutral-white">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className=" font-bold">{ticket.name}</h3>
                        <p className="text-gray/90 text-sm">{ticket.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs capitalize
            ${ticket.status === 'active' ? 'bg-primary-green/20 text-primary-green' :
                            ticket.status === 'used' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-red-500/20 text-red-500'
                        }`}>
                        {ticket.status}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <p className="text-gray/90">Ticket Type</p>
                        <p className="">{ticket.ticketType}</p>
                    </div>
                    <div>
                        <p className="text-gray/90">Quantity</p>
                        <p className="">{ticket.ticketCount}</p>
                    </div>
                </div>

                {ticket.request && (
                    <div className="text-sm">
                        <p className="text-gray/90">Special Request</p>
                        <p className=" line-clamp-2">{ticket.request}</p>
                    </div>
                )}

                <div className="text-xs text-gray/90">
                    <p>Purchased by: {ticket.purchasedBy}</p>
                    <p>Date: {new Date(ticket.purchaseDate).toLocaleString()}</p>
                </div>

                <div className="flex gap-2 mt-2">
                    <Button
                        className="flex-1"
                        variant="outline"
                        title="Download"
                        onClick={() => {/* Add download functionality */ }}
                    />
                    <Button
                        className="flex-1"
                        variant="danger"
                        title="Delete"
                        onClick={() => onDelete(ticket.id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyTickets;
