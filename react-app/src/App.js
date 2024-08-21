import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import SideNavbar from './components/SideNavBar';
import HomePage from './components/MainPage/HomePage';
import SingleInvoice from './components/SingleInvoice';
import EditInvoice from './components/EditInvoice';
import { authenticate } from './store/session';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './output.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <SideNavbar />
      <NavBar />
      <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<HomePage />} />
          <Route path="/invoice/:id" element={<SingleInvoice />} />
          <Route path="/invoice/:id/edit" element={<EditInvoice />} />
        </Route >

      </Routes>
    </BrowserRouter>
  );
}

export default App;
