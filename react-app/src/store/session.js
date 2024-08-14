// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

// Action to authenticate the user using the stored JWT token
export const authenticate = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('/api/auth/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return;
      }
      dispatch(setUser(data));
    } else {
      // If the token is invalid or expired, remove it
      localStorage.removeItem('token');
      dispatch(removeUser());
    }
  }
};

// Action to log in the user
export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.access_token); // Store JWT token in localStorage
    dispatch(setUser(data.user));  // Assuming `data.user` contains user info
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Action to log out the user
export const logout = () => async (dispatch) => {
  // You might not need to make an API request to logout when using JWT.
  localStorage.removeItem('token'); // Remove JWT token from storage
  dispatch(removeUser());
};

// Action to sign up a new user
export const signUp = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    dispatch(setUser(data.user));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

// Reducer function to handle the state
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
