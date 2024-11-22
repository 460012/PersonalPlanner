'use client'

import Link from 'next/link';
import NavLinks from '@/app/Components/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useModal, ModalTypes } from '@/app/Components/Modal/ModalContext';
import { removeCookie } from '../utils/cookieUtils';
//import { useDialog } from './Dialog/DialogContext';

const logoutClickEvent = () => {
  removeCookie("projectID");
  removeCookie("UserID");
}

const SideNav: React.FC = () => {
  const { openModal } = useModal(); // Access openModal function using the useModal hook

  const handleOpenModal = () => {
    openModal(() => (
      <div>
        <h2 style={{ color: 'green' }}>Logout Content</h2>
        <p>This is the content of the modal for logging out.</p>
        <a href="/api/auth/logout"><button type='button' onClick={logoutClickEvent} className="bg-BTDanger hover:bg-BTDanger-dark px-4 py-2 rounded-md mt-4">Sign-Out</button></a>
      </div>
    ), ModalTypes.SMALLBOX); // Call the openModal function from the context
  };

  // const { openDialog } = useDialog();

  // const handleOpenModal = () => {
  //   //setIsDialogOpen(true);
  //   console.log('dialog1: Modal opening');
  //   openDialog('dialog1')
  // }

  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  // };

  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button onClick={handleOpenModal} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-blue-600 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}

export default SideNav;
