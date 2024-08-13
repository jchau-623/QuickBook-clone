import React, { useState } from 'react';
import CompanyInfo from './CompanyInfo';
import BillToInfo from './BillToInfo';
import InvoiceDetails from './InvoiceDetails';
import LineItems from './LineItems';
import Summary from './Summary';

const HomePage = () => {
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
            { description: 'Base rent', unitPrice: '', amount: '' },
            { description: 'Maintenance fees', unitPrice: '', amount: '' },
            // Add more items as needed
        ],
        subtotal: '',
        tax: '',
        total: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(invoiceData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Invoice</h1>
            <form onSubmit={handleSubmit} className="space-y-8">
                <CompanyInfo data={invoiceData} handleChange={handleChange} />
                <BillToInfo data={invoiceData} handleChange={handleChange} />
                <InvoiceDetails data={invoiceData} handleChange={handleChange} />
                <LineItems data={invoiceData.lineItems} handleLineItemChange={handleLineItemChange} />
                <Summary data={invoiceData} handleChange={handleChange} />
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
