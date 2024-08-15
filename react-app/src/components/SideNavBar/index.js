import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInvoices } from '../../store/invoices';
import { Link } from 'react-router-dom';  // Import Link component

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
        <div className="flex print:hidden">
            {/* Toggle Button */}
            <button
                onClick={toggleNavbar}
                className="focus:outline-none fixed top-4 left-4 z-20"
            >
                <svg
                    className="w-8 h-8 text-white"
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

            {/* Navbar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } w-64 z-10`}
            >
                <div className="p-4 mt-16">
                    <h2 className="text-lg font-semibold mb-4">Invoices</h2>

                    {/* Dropdown Content */}
                    {isOpen && (
                        <ul>
                            {invoices.map((invoice) => (
                                <li key={invoice.id} className="mb-2">
                                    <Link to={`/invoice/${invoice.id}`} className="block">
                                        <span className="font-bold">{invoice.company_name}</span>
                                        <br />
                                        <span className="text-sm">{invoice.invoice_number}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={toggleNavbar}
                    className="fixed inset-0 bg-black opacity-50 z-0"
                ></div>
            )}
        </div>
    );
};

export default SideNavbar;
