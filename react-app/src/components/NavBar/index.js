import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  
  return (
    <nav className="bg-gray-800 p-4 shadow-md print:hidden h-16">
      <ul className="flex justify-between items-center h-full">
        <div className="flex items-center">
          {/* Left side: Empty div to balance the right side */}
        </div>
        <div className="flex-1 text-center">
          <NavLink
            to='/home'
            className="text-white hover:text-green-300"
          >
            Home
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
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
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
