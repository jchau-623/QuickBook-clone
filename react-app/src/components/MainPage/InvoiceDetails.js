import React from 'react';

const InvoiceDetails = ({ data, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <label className="block">
                    <span className="text-gray-700">Invoice Number</span>
                    <input
                        type="text"
                        name="invoiceNumber"
                        value={data.invoiceNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Invoice Date</span>
                    <input
                        type="date"
                        name="invoiceDate"
                        value={data.invoiceDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Terms</span>
                    <input
                        type="text"
                        name="terms"
                        value={data.terms}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default InvoiceDetails;
