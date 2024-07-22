import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, setItems } from './invoiceSlice';
import axios from 'axios';
import './App.css';

function App() {
    const items = useSelector((state) => state.invoices.items);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [client, setClient] = useState('');
    const [month, setMonth] = useState('');
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const response = await axios.get('/api/invoices');
        setInvoices(response.data);
    };

    const handleAddItem = () => {
        if (!description || !amount) {
            setError('Description and amount are required');
            return;
        }
        if (isNaN(amount) || amount <= 0) {
            setError('Amount must be a positive number');
            return;
        }
        if (isEditing) {
            const updatedItems = items.map((item, index) =>
                index === currentIndex ? { description, amount: parseFloat(amount) } : item
            );
            dispatch(setItems(updatedItems));
            setIsEditing(false);
            setCurrentIndex(null);
        } else {
            dispatch(addItem({ description, amount: parseFloat(amount) }));
        }
        setDescription('');
        setAmount('');
        setError('');
    };

    const handleEditItem = (index) => {
        setDescription(items[index].description);
        setAmount(items[index].amount);
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
        dispatch(setItems(updatedItems));
    };

    const handleSaveInvoice = async () => {
        if (!client || !month) {
            setError('Client and month are required');
            return;
        }
        const response = await axios.post('/api/invoices', {
            client,
            month,
            items,
        });
        setClient('');
        setMonth('');
        dispatch(setItems([]));
        fetchInvoices();
        alert('Invoice saved successfully');
    };

    const handleSelectInvoice = async (invoice) => {
        setSelectedInvoice(invoice);
        dispatch(setItems(invoice.items));
    };

    const handleDeleteInvoice = async (invoiceId) => {
        await axios.delete(`/api/invoices/${invoiceId}`);
        fetchInvoices();
        if (selectedInvoice && selectedInvoice.id === invoiceId) {
            setSelectedInvoice(null);
            dispatch(setItems([]));
        }
    };

    return (
        <div className="App">
            <h1>Invoice</h1>
            {error && <p className="error">{error}</p>}
            <div className="input-group">
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
            </div>
            <button onClick={handleAddItem}>{isEditing ? 'Update Item' : 'Add Item'}</button>
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
            <h2>Invoice Items</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item.description}: ${item.amount.toFixed(2)}
                        <button onClick={() => handleEditItem(index)}>Edit</button>
                        <button onClick={() => handleDeleteItem(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Total: ${items.reduce((total, item) => total + item.amount, 0).toFixed(2)}</h2>
        </div>
    );
}

export default App;
