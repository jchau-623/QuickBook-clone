import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteInvoice } from '../../store/invoices';

const SingleInvoice = () => {
    const { id } = useParams();
    const invoices = useSelector(state => state.invoices.invoices);
    const [invoice, setInvoice] = useState({
        invoice_number: '',
        invoice_date: '',
        terms: '',
        tax: 0.00,
        subtotal: 0.00,
        total: 0.00,
        line_items: []
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const selectedInvoice = invoices.find(inv => inv.id === parseInt(id));
        if (selectedInvoice) {
            setInvoice(selectedInvoice);
        }
    }, [id, invoices]);

    useEffect(() => {
        if (invoice.line_items) {
            // Calculate subtotal by summing all the amounts
            const subtotal = invoice.line_items.reduce((acc, item) => {
                return acc + parseFloat(item.amount || 0);
            }, 0);

            // Calculate total by adding tax to the subtotal
            const tax = parseFloat(invoice.tax) || 0;
            const total = subtotal + tax;

            // Update the invoice state with the new subtotal and total
            setInvoice(prevInvoice => ({
                ...prevInvoice,
                subtotal: subtotal.toFixed(2),
                total: total.toFixed(2)
            }));
        }
    }, [invoice.line_items, invoice.tax]);

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this invoice?");
        if (confirmation) {
            await dispatch(deleteInvoice(id));
            navigate('/home');
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!invoice) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg">
            {/* Header with Edit, Delete, and Print buttons */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Shy, LLC</h1>
                    <p>8 Laurel Lane</p>
                    <p>Old Westbury, NY 11568</p>
                    <p>516-739-4688</p>
                    <p>917-578-9029</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-bold">INVOICE</h2>
                    <div className="flex justify-end space-x-4 mt-4 print:hidden">
                        <button onClick={handlePrint} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                            Print
                        </button>
                        <Link to={`/invoice/${id}/edit`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Bill To and Invoice Details */}
            <div className="flex justify-between items-start mb-8">
                <div className="w-1/2">
                    <p className="font-semibold border-b border-gray-300 mb-2">BILLED TO:</p>
                    <p>Mikiya By Chubby Flushing LLC</p>
                    <p>135-41 37th Avenue, 2nd Floor Rear</p>
                    <p>Flushing, NY 11354</p>
                </div>
                <div className="w-1/2 text-right">
                    <p><strong>INVOICE NUMBER:</strong> {invoice.invoice_number}</p>
                    <p><strong>INVOICE DATE:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                    <p><strong>TERMS:</strong> Due On or Before the 10th of the following month</p>
                </div>
            </div>

            {/* Line Items */}
            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-2">QUANTITY</th>
                        <th className="text-left p-2">DESCRIPTION</th>
                        <th className="text-right p-2">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.line_items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{item.description}</td>
                            <td className="p-2 text-right">${parseFloat(item.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Invoice Summary */}
            <div className="flex justify-end items-start mb-8">
                <div className="w-1/2">
                    <div className="flex justify-between border-t border-gray-300 pt-4">
                        <p className="font-semibold">SUBTOTAL</p>
                        <p>${invoice.subtotal}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-4">
                        <p className="font-semibold">TAX</p>
                        <p>${invoice.tax}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-4 font-bold">
                        <p className="font-semibold">TOTAL</p>
                        <p>${invoice.total}</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-gray-300 pt-4 ">
                <p className="font-semibold">MAKE ALL CHECKS PAYABLE TO:</p>
                <p>Shy, LLC</p>
                <p className="mt-4">Questions concerning this invoice?</p>
                <p>Call: John Chau, 917-578-9029</p>
            </div>
        </div>
    );
};

export default SingleInvoice;
