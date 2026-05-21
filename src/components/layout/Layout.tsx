import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavBar } from './TopNavBar';
import { DrawerProvider } from '../ui/DetailDrawer';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <DrawerProvider>
      <div className="bg-surface text-on-surface antialiased min-h-screen font-body flex flex-col">
        <TopNavBar toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 pt-[64px]">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content — keyed by pathname so it remounts on navigation,
              triggering the vera-page CSS entry animation each time. */}
          <main
            key={location.pathname}
            className="vera-page flex-1 lg:ml-64 relative min-h-[calc(100vh-64px)] overflow-x-hidden"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </DrawerProvider>
  );
};
