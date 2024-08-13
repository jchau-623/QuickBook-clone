import React from 'react';

const CompanyInfo = ({ data, handleChange }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Company Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                    <span className="text-gray-700">Company Name</span>
                    <input
                        type="text"
                        name="companyName"
                        value={data.companyName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Company Address</span>
                    <input
                        type="text"
                        name="companyAddress"
                        value={data.companyAddress}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Company Phone</span>
                    <input
                        type="text"
                        name="companyPhone"
                        value={data.companyPhone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </label>
            </div>
        </div>
    );
};

export default CompanyInfo;
