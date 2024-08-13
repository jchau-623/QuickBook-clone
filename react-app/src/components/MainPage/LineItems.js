import React from 'react';

const LineItems = ({ data, handleLineItemChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Line Items</h2>
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-end">
                        <label className="block">
                            <span className="text-gray-700">Description</span>
                            <input
                                type="text"
                                name="description"
                                value={item.description}
                                onChange={(e) => handleLineItemChange(index, e)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Unit Price</span>
                            <input
                                type="text"
                                name="unitPrice"
                                value={item.unitPrice}
                                onChange={(e) => handleLineItemChange(index, e)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Amount</span>
                            <input
                                type="text"
                                name="amount"
                                value={item.amount}
                                onChange={(e) => handleLineItemChange(index, e)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LineItems;
