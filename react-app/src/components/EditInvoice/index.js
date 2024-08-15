import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editInvoice } from '../../store/invoices';

const EditInvoice = () => {
    const { id } = useParams();
    const invoices = useSelector(state => state.invoices.invoices);
    const [invoice, setInvoice] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const selectedInvoice = invoices.find(inv => inv.id === parseInt(id));
        if (selectedInvoice) {
            setInvoice(selectedInvoice);
        }
    }, [id, invoices]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoice({ ...invoice, [name]: value });
    };

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
                        <th className="text-left p-2">QUANTITY</th>
                        <th className="text-left p-2">DESCRIPTION</th>
                        <th className="text-right p-2">UNIT PRICE</th>
                        <th className="text-right p-2">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.line_items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                                <input
                                    type="text"
                                    name={`line_items[${index}].description`}
                                    value={item.description}
                                    onChange={(e) => {
                                        const updatedItems = [...invoice.line_items];
                                        updatedItems[index].description = e.target.value;
                                        setInvoice({ ...invoice, line_items: updatedItems });
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    name={`line_items[${index}].unit_price`}
                                    value={item.unit_price}
                                    onChange={(e) => {
                                        const updatedItems = [...invoice.line_items];
                                        updatedItems[index].unit_price = parseFloat(e.target.value);
                                        setInvoice({ ...invoice, line_items: updatedItems });
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded text-right"
                                />
                            </td>
                            <td className="p-2 text-right">
                                <input
                                    type="number"
                                    name={`line_items[${index}].amount`}
                                    value={item.amount}
                                    onChange={(e) => {
                                        const updatedItems = [...invoice.line_items];
                                        updatedItems[index].amount = parseFloat(e.target.value);
                                        setInvoice({ ...invoice, line_items: updatedItems });
                                    }}
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
                        <p>${invoice.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-4">
                        <p className="font-semibold">TAX</p>
                        <p>${invoice.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-4 font-bold">
                        <p className="font-semibold">TOTAL</p>
                        <p>${invoice.total.toFixed(2)}</p>
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
