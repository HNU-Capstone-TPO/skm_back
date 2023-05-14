import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
      </footer>
    </div>
  );
};

export default Layout;