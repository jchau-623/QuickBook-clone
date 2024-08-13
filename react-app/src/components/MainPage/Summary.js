import React from 'react';

const Summary = ({ data, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <label className="block">
                    <span className="text-gray-700">Subtotal</span>
                    <input
                        type="text"
                        name="subtotal"
                        value={data.subtotal}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Tax</span>
                    <input
                        type="text"
                        name="tax"
                        value={data.tax}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Total</span>
                    <input
                        type="text"
                        name="total"
                        value={data.total}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default Summary;
