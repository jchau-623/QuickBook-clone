import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="bg-gray-800 p-4 shadow-md print:hidden">
      <ul className="flex space-x-4 justify-between">

        <li className="flex-grow text-center">
          <NavLink
            to='/home'
            className="text-white font-bold hover:text-green-300"
          >
            Back to Home
          </NavLink>
        </li>
        <li>
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive ? "text-white font-bold hover:text-green-300" : "text-white hover:text-green-300"
                }
              >
                Login
              </NavLink>
              <NavLink
                to='/sign-up'
                className={({ isActive }) =>
                  isActive ? "text-white font-bold hover:text-green-300" : "text-white hover:text-green-300"
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
