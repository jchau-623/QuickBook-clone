import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setItems } from '../store/invoiceSlice';

const InvoiceForm = ({ isEditing, currentIndex, setIsEditing, setCurrentIndex }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.invoices.items);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

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

    return (
        <div className="invoice-form">
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
        </div>
    );
};

export default InvoiceForm;
