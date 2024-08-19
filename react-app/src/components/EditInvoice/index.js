import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editInvoice } from '../../store/invoices';

const EditInvoice = () => {
    const { id } = useParams();
    const invoices = useSelector(state => state.invoices.invoices);
    const [invoice, setInvoice] = useState({
        bill_to_name: '',
        bill_to_address: '',
        invoice_number: '',
        invoice_date: '',
        terms: '',
        tax: '0.00',
        subtotal: '0.00',
        total: '0.00',
        line_items: []
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const selectedInvoice = invoices.find(inv => inv.id === parseInt(id));
        if (selectedInvoice) {
            setInvoice({
                ...selectedInvoice,
                line_items: selectedInvoice.line_items || [],
                tax: selectedInvoice.tax || '0.00',
                subtotal: selectedInvoice.subtotal || '0.00',
                total: selectedInvoice.total || '0.00'
            });
        }
    }, [id, invoices]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    };

    const handleLineItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLineItems = invoice.line_items.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setInvoice(prevInvoice => ({
            ...prevInvoice,
            line_items: updatedLineItems
        }));
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(editInvoice(id, invoice));
        navigate(`/invoice/${id}`);
    };

    if (!invoice) {
        return <div className="text-center text-gray-600">Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Shy, LLC</h1>
                </div>
            </div>

            {/* Bill To and Invoice Details */}
            <div className="flex justify-between items-start mb-8">
                <div className="w-1/2">
                    <p className="font-semibold border-b border-gray-300 mb-2">BILLED TO:</p>
                    <input
                        type="text"
                        name="bill_to_name"
                        value={invoice.bill_to_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                        name="bill_to_address"
                        value={invoice.bill_to_address}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                    />
                </div>
                <div className="w-1/2 text-right">
                    <label className="block font-semibold">INVOICE NUMBER:</label>
                    <input
                        type="text"
                        name="invoice_number"
                        value={invoice.invoice_number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <label className="block font-semibold mt-4">INVOICE DATE:</label>
                    <input
                        type="date"
                        name="invoice_date"
                        value={invoice.invoice_date}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <label className="block font-semibold mt-4">TERMS:</label>
                    <input
                        type="text"
                        name="terms"
                        value={invoice.terms}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>

            {/* Line Items */}
            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left p-2">DESCRIPTION</th>
                        <th className="text-right p-2">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.line_items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-2">
                                <input
                                    type="text"
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleLineItemChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    name="amount"
                                    value={item.amount}
                                    onChange={(e) => handleLineItemChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded text-right"
                                />
                            </td>
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
            <div className="text-center border-t border-gray-300 pt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Save Changes
                </button>
            </div>
        </form>
    );
};

export default EditInvoice;
