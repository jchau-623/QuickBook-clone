import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
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
                exact="true"
                className="text-white hover:text-green-300"
                activeClassName="font-bold"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                exact="true"
                className="text-white hover:text-green-300"
                activeClassName="font-bold"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/sign-up'
                exact="true"
                className="text-white hover:text-green-300"
                activeClassName="font-bold"
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
