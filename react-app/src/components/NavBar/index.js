import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="bg-gray-800 p-4 shadow-md print:hidden">
      <ul className="flex space-x-4 justify-end">
        {user ? (
          <li>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li>
              <NavLink
                to='/home'
                className={({ isActive }) =>
                  isActive ? "text-white font-bold hover:text-green-300" : "text-white hover:text-green-300"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                className={({ isActive }) =>
                  isActive ? "text-white font-bold hover:text-green-300" : "text-white hover:text-green-300"
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/sign-up'
                className={({ isActive }) =>
                  isActive ? "text-white font-bold hover:text-green-300" : "text-white hover:text-green-300"
                }
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
