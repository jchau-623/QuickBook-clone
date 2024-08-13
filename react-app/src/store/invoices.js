// constants
const SET_INVOICES = 'invoices/SET_INVOICES';
const ADD_INVOICE = 'invoices/ADD_INVOICE';
const UPDATE_INVOICE = 'invoices/UPDATE_INVOICE';
const REMOVE_INVOICE = 'invoices/REMOVE_INVOICE';

// action creators
const setInvoices = (invoices) => ({
    type: SET_INVOICES,
    payload: invoices
});

const addInvoice = (invoice) => ({
    type: ADD_INVOICE,
    payload: invoice
});

const updateInvoice = (invoice) => ({
    type: UPDATE_INVOICE,
    payload: invoice
});

const removeInvoice = (invoiceId) => ({
    type: REMOVE_INVOICE,
    payload: invoiceId
});

// initial state
const initialState = { invoices: [] };

// thunk actions
export const fetchInvoices = () => async (dispatch) => {
    const response = await fetch('/api/invoices/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setInvoices(data));
    }
};

export const createInvoice = (invoiceData) => async (dispatch) => {
    const response = await fetch('/api/invoices/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addInvoice(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const editInvoice = (invoiceId, invoiceData) => async (dispatch) => {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoiceData)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateInvoice(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const deleteInvoice = (invoiceId) => async (dispatch) => {
    const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        dispatch(removeInvoice(invoiceId));
    } else {
        return ['An error occurred. Please try again.'];
    }
};

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_INVOICES:
            return { ...state, invoices: action.payload };
        case ADD_INVOICE:
            return { ...state, invoices: [...state.invoices, action.payload] };
        case UPDATE_INVOICE:
            return {
                ...state,
                invoices: state.invoices.map((invoice) =>
                    invoice.id === action.payload.id ? action.payload : invoice
                )
            };
        case REMOVE_INVOICE:
            return {
                ...state,
                invoices: state.invoices.filter(invoice => invoice.id !== action.payload)
            };
        default:
            return state;
    }
}
