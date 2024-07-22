import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTotal = createAsyncThunk('invoices/fetchTotal', async (invoiceId) => {
    const response = await axios.get(`/api/invoices/${invoiceId}/total`);
    return response.data.total;
});

export const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTotal.fulfilled, (state, action) => {
            state.total = action.payload;
        });
    },
});

export const { addItem, setItems } = invoiceSlice.actions;

export default invoiceSlice.reducer;
