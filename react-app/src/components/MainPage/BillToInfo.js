import React from 'react';

const BillToInfo = ({ data, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Billed To</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                    <span className="text-gray-700">Bill To Name</span>
                    <input
                        type="text"
                        name="billToName"
                        value={data.billToName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Bill To Address</span>
                    <input
                        type="text"
                        name="billToAddress"
                        value={data.billToAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default BillToInfo;
