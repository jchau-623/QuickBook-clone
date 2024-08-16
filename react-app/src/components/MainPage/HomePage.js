import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createInvoice } from '../../store/invoices'; // Import the createInvoice action

const HomePage = () => {
    const dispatch = useDispatch(); // Initialize dispatch for use in the component
    const [invoiceData, setInvoiceData] = useState({
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        billToName: '',
        billToAddress: '',
        invoiceNumber: '',
        invoiceDate: '',
        terms: '',
        lineItems: [
            { description: 'Base rent', amount: '' },
            { description: 'Maintenance fees', amount: '' },
            { description: 'Water & Sewage', amount: '' },
            { description: 'Insurance', amount: '' },
            { description: 'Elevator', amount: '' },
            { description: 'Electricity', amount: '' },
            { description: 'Telephone', amount: '' },
            { description: 'Sprinkler Maintenance', amount: '' },
            { description: 'Fire Alarm Maintenance', amount: '' },
            { description: 'Fire Alarm Monitoring', amount: '' },
        ],
        subtotal: '0.00',
        tax: '0.00',
        total: '0.00'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLineItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLineItems = invoiceData.lineItems.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setInvoiceData(prevData => ({
            ...prevData,
            lineItems: updatedLineItems
        }));
    };

    useEffect(() => {
        // Calculate subtotal by summing all the amounts
        const subtotal = invoiceData.lineItems.reduce((acc, item) => {
            return acc + parseFloat(item.amount || 0);
        }, 0);

        // Calculate total by adding tax to the subtotal
        const tax = parseFloat(invoiceData.tax) || 0;
        const total = subtotal + tax;

        // Update the invoiceData state with the new subtotal and total
        setInvoiceData(prevData => ({
            ...prevData,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2)
        }));
    }, [invoiceData.lineItems, invoiceData.tax]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(invoiceData);
        // Dispatch the createInvoice action to save the invoice
        await dispatch(createInvoice(invoiceData));
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Create Invoice</h1>
            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Company Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Company Name</span>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={invoiceData.companyName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Company Address</span>
                                <input
                                    type="text"
                                    name="companyAddress"
                                    value={invoiceData.companyAddress}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Company Phone</span>
                                <input
                                    type="text"
                                    name="companyPhone"
                                    value={invoiceData.companyPhone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Bill To Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Billed To</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Bill To Name</span>
                                <input
                                    type="text"
                                    name="billToName"
                                    value={invoiceData.billToName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Bill To Address</span>
                                <input
                                    type="text"
                                    name="billToAddress"
                                    value={invoiceData.billToAddress}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Invoice Details */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Details</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Invoice Number</span>
                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    value={invoiceData.invoiceNumber}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Invoice Date</span>
                                <input
                                    type="date"
                                    name="invoiceDate"
                                    value={invoiceData.invoiceDate}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Terms</span>
                                <input
                                    type="text"
                                    name="terms"
                                    value={invoiceData.terms}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Line Items */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Line Items</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Description</th>
                                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.lineItems.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="description"
                                            value={item.description}
                                            onChange={(e) => handleLineItemChange(index, e)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <input
                                            type="text"
                                            name="amount"
                                            value={item.amount}
                                            onChange={(e) => handleLineItemChange(index, e)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Subtotal</span>
                                <input
                                    type="text"
                                    name="subtotal"
                                    value={invoiceData.subtotal}
                                    onChange={handleChange}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-100 cursor-not-allowed"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Tax</span>
                                <input
                                    type="text"
                                    name="tax"
                                    value={invoiceData.tax}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Total</span>
                                <input
                                    type="text"
                                    name="total"
                                    value={invoiceData.total}
                                    onChange={handleChange}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-100 cursor-not-allowed"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                >
                    Create Invoice
                </button>
            </form>
        </div>
    );
};

export default HomePage;
