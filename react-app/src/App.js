import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, fetchTotal } from './invoiceSlice';

function App() {
    const items = useSelector((state) => state.invoices.items);
    const total = useSelector((state) => state.invoices.total);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddItem = () => {
        dispatch(addItem({ description, amount: parseFloat(amount) }));
        setDescription('');
        setAmount('');
    };

    const handleCalculateTotal = () => {
        dispatch(fetchTotal(0));  // Assuming we're always working with invoice 0 for simplicity
    };

    return (
        <div className="App">
            <h1>Invoice</h1>
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
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleCalculateTotal}>Calculate Total</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.description}: ${item.amount.toFixed(2)}</li>
                ))}
            </ul>
            <h2>Total: ${total.toFixed(2)}</h2>
        </div>
    );
}

export default App;
