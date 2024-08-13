import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <button
      onClick={onLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
