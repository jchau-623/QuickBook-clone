import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../store/invoiceSlice';

const ItemList = ({ setIsEditing, setCurrentIndex }) => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.invoices.items);

    const handleEditItem = (index) => {
        setIsEditing(true);
        setCurrentIndex(index);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
        dispatch(setItems(updatedItems));
    };

    return (
        <div className="item-list">
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
};

export default ItemList;
