import React from 'react';

const InvoiceList = ({ invoices, handleSelectInvoice, handleDeleteInvoice }) => {
    return (
        <div className="invoice-list">
            <h2>Invoices</h2>
            <ul>
                {invoices.map((invoice) => (
                    <li key={invoice.id}>
                        {invoice.client} - {invoice.month}
                        <button onClick={() => handleSelectInvoice(invoice)}>View</button>
                        <button onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
