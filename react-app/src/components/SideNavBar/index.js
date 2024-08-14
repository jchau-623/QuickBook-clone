import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '../../store/invoices';

const SideNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const invoices = useSelector(state => state.invoices.invoices);

    const toggleNavbar = () => {
        if (!isOpen && invoices.length === 0) {
            dispatch(fetchInvoices());
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                        Invoices
                        <button onClick={toggleNavbar} className="focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </h2>

                    {/* Dropdown Content */}
                    {isOpen && (
                        <ul>
                            {invoices.map((invoice) => (
                                <li key={invoice.id} className="mb-2">
                                    <span className="font-bold">{invoice.name}</span>
                                    <br />
                                    <span className="text-sm">{invoice.invoice_number}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;
