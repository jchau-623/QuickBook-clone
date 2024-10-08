import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createInvoice } from '../../store/invoices';

const HomePage = () => {
    const dispatch = useDispatch();
    const [invoiceData, setInvoiceData] = useState({
        company_name: '',
        company_address: '',
        company_phone: '',
        bill_to_name: '',
        bill_to_address: '',
        invoice_number: '',
        invoice_date: '',
        terms: '',
        contact_name: '',
        contact_phone: '',
        line_items: [
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
        const updatedLineItems = invoiceData.line_items.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setInvoiceData(prevData => ({
            ...prevData,
            line_items: updatedLineItems
        }));
    };

    const handleAddLineItem = () => {
        setInvoiceData(prevData => ({
            ...prevData,
            line_items: [...prevData.line_items, { description: '', amount: '' }]
        }));
    };

    const handleDeleteLineItem = (index) => {
        const updatedLineItems = invoiceData.line_items.filter((_, i) => i !== index);
        setInvoiceData(prevData => ({
            ...prevData,
            line_items: updatedLineItems
        }));
    };

    useEffect(() => {
        const subtotal = invoiceData.line_items.reduce((acc, item) => {
            return acc + parseFloat(item.amount || 0);
        }, 0);

        const tax = parseFloat(invoiceData.tax) || 0;
        const total = subtotal + tax;

        setInvoiceData(prevData => ({
            ...prevData,
            subtotal: subtotal.toFixed(2),
            total: total.toFixed(2)
        }));
    }, [invoiceData.line_items, invoiceData.tax]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(invoiceData);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }
        const response = await dispatch(createInvoice(invoiceData));
        if (response) {
            alert('Invoice created successfully');
        }
    };

    const validateForm = (data) => {
        let errors = [];
        if (!data.company_name) errors.push('Company Name is required');
        if (!data.company_address) errors.push('Company Address is required');
        if (!data.company_phone) errors.push('Company Phone is required');
        if (!data.bill_to_name) errors.push('Bill To Name is required');
        if (!data.bill_to_address) errors.push('Bill To Address is required');
        if (!data.invoice_number) errors.push('Invoice Number is required');
        if (!data.invoice_date) errors.push('Invoice Date is required');
        if (!data.contact_name) errors.push('Contact Name is required');
        if (!data.contact_phone) errors.push('Contact Phone is required');
        data.line_items.forEach((item, index) => {
            if (!item.description) errors.push(`Description is required for line item ${index + 1}`);
            if (!item.amount) errors.push(`Amount is required for line item ${index + 1}`);
        });
        if (!data.tax) errors.push('Tax is required');
        return errors;
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
                                    name="company_name"
                                    value={invoiceData.company_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Company Address</span>
                                <input
                                    type="text"
                                    name="company_address"
                                    value={invoiceData.company_address}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Company Phone</span>
                                <input
                                    type="text"
                                    name="company_phone"
                                    value={invoiceData.company_phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Contact Name</span>
                                <input
                                    type="text"
                                    name="contact_name"
                                    value={invoiceData.contact_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Contact Phone</span>
                                <input
                                    type="text"
                                    name="contact_phone"
                                    value={invoiceData.contact_phone}
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
                                    name="bill_to_name"
                                    value={invoiceData.bill_to_name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Bill To Address</span>
                                <input
                                    type="text"
                                    name="bill_to_address"
                                    value={invoiceData.bill_to_address}
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
                                    name="invoice_number"
                                    value={invoiceData.invoice_number}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Invoice Date</span>
                                <input
                                    type="date"
                                    name="invoice_date"
                                    value={invoiceData.invoice_date}
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
                                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceData.line_items.map((item, index) => (
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
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteLineItem(index)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="button"
                        onClick={handleAddLineItem}
                        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Add Line Item
                    </button>
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
