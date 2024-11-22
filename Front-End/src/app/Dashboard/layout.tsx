'use client'

import SideNav from '@/app/Components/sidenav';
import ProjectSideNav from '@/app/Components/ProjectSideNav';
import React, { useState } from 'react';
import { ModalProvider } from '@/app/Components/Modal/ModalContext';
import CustomModal from '@/app/Components/Modal/Modals/CustomModal';
import { AlertListProvider } from '../Components/Alert/AlertContext';
import AlertsList from '../Components/Alert/AlertsList';

interface LayoutProps {
  children: React.ReactNode;
  useProjectSideNav?: boolean; // Optional prop, default is false
}

export default function Layout({ children, useProjectSideNav = false }: LayoutProps) {
  //console.log("useProjectSideNav: ", useProjectSideNav);

  return (
    <ModalProvider>
      <AlertListProvider>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            {useProjectSideNav ? <ProjectSideNav /> : <SideNav />}
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          <div className="absolute top-0 right-0 mt-6 mr-6"> {/* Position the alerts */}
              <AlertsList /> {/* Assuming AlertsList is rendered here */}
            </div>
        </div>
        <CustomModal />
      </AlertListProvider>
    </ModalProvider>
  );
}