import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-300/50">
      <Navbar 
        activeMenu={activeMenu} 
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
      />

      {user && (
        <div className="flex">
          <SideMenu 
            activeMenu={activeMenu} 
            isOpen={isMobileMenuOpen} 
            setIsOpen={setIsMobileMenuOpen} 
          />

          <div className="grow p-5 w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;