import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import InvoiceForm from './InvoiceForm';
import ItemList from './ItemList';
import InvoiceList from './InvoiceList';
import { setItems } from '../store/invoiceSlice';

import './App.css';

const HomePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [client, setClient] = useState('');
    const [month, setMonth] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const items = useSelector((state) => state.invoices.items);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/invoices');
            setInvoices(response.data);
        } catch (error) {
            console.error('Failed to fetch invoices', error);
        }
    };

    const handleSaveInvoice = async () => {
        if (!client || !month) {
            setError('Client and month are required');
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/invoices', {
                client,
                month,
                items,
            });
            setClient('');
            setMonth('');
            dispatch(setItems([]));
            fetchInvoices();
            alert('Invoice saved successfully');
        } catch (error) {
            console.error('Failed to save invoice', error);
            setError('Failed to save invoice');
        }
    };

    const handleSelectInvoice = (invoice) => {
        setSelectedInvoice(invoice);
        dispatch(setItems(invoice.items));
    };

    const handleDeleteInvoice = async (invoiceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
            fetchInvoices();
            if (selectedInvoice && selectedInvoice.id === invoiceId) {
                setSelectedInvoice(null);
                dispatch(setItems([]));
            }
        } catch (error) {
            console.error('Failed to delete invoice', error);
            setError('Failed to delete invoice');
        }
    };

    return (
        <div className="App">
            <h1>Invoice</h1>
            {error && <p className="error">{error}</p>}
            <InvoiceForm
                isEditing={isEditing}
                currentIndex={currentIndex}
                setIsEditing={setIsEditing}
                setCurrentIndex={setCurrentIndex}
            />
            <div className="input-group">
                <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Client"
                />
                <input
                    type="text"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Month"
                />
            </div>
            <button onClick={handleSaveInvoice}>Save Invoice</button>
            <InvoiceList
                invoices={invoices}
                handleSelectInvoice={handleSelectInvoice}
                handleDeleteInvoice={handleDeleteInvoice}
            />
            <ItemList
                setIsEditing={setIsEditing}
                setCurrentIndex={setCurrentIndex}
            />
        </div>
    );
};

export default HomePage;
