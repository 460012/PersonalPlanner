"use client"; // This is a client component 👈🏽
//import { useTheme } from '@/app/Components/ThemeSelector/ThemeContext';
import { useModal, ModalTypes } from '@/app/Components/Modal/ModalContext';
//import AlertsList from '@/app/Components/Alert/AlertsList'; // Assuming you have the AlertsList component
import { AlertTypes } from '@/app/Components/Alert/Alert'; // Assuming you have the AlertsList component
import { useAlertList } from '@/app/Components/Alert/AlertContext'; // Assuming you have the AlertsList component
import { useEffect, useState } from 'react';
import { OwnApiConnection } from '../utils/OwnApiConnection';
import { getCookie, setCookie } from '../utils/cookieUtils';
import { useUser } from "@auth0/nextjs-auth0/client";

async function checkAndActEmailInDB(email: string) {
  try {
    const constring = OwnApiConnection + '/User/checkAndActEmail';
    //console.log('Sending: ', email)

    const response = await fetch(constring, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Send email as a JSON object
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error with email:', error);
    return null;
  }
}

export default function Page() {

  const alertsData = [
    { type: AlertTypes.Success, message: 'This is a success alert!' },
    { type: AlertTypes.Danger, message: 'This is an error alert!' },
    { type: AlertTypes.Warning, message: 'This is a warning alert!' },
    { type: AlertTypes.Info, message: 'This is a info alert!' },
  ];

  const [email, setEmail] = useState('');
  const { user, error, isLoading } = useUser(); // Using useUser hook from @auth0/nextjs-auth0/client
  const { openModal } = useModal();
  const { addAlert } = useAlertList();

  // Effect to set the email state when user data becomes available
  useEffect(() => {
    if (user) {
      setEmail(user.email || ''); // Set email state to user's email if available
    }
  }, [user]);

  // Effect to check and act on the email in the database
  useEffect(() => {
    async function performAction() {
      const cookie = getCookie('UserID');
      console.log('NOM NOMs: ', cookie);
      // Check if email is available and UserID cookie doesn't exist
      if (email && !cookie) {
        const result = await checkAndActEmailInDB(email);
        console.log("Result emailcheck: ", result);
        if (result !== null) {
          setCookie('UserID', result);
        }
      }
    }
    performAction();
  }, [email]);


  const showAlert = () => {
    alert('This is an alert!');
  }

  const handleOpenModal = () => {
    openModal(() => (
      <div>
        <h2 style={{ color: 'green' }}>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={showAlert}>Show alert</button>
        
        <button onClick={addWarningAlert}>Add warning</button>
      </div>
    ), ModalTypes.FULLSCREEN);
  };

  const handleAddAlertClick = () => {
    addAlert(AlertTypes.Success, (
      <div>
        <strong>This is a success message.</strong>
        <h2>The action was successfully executed</h2>
      </div>
    ));
  }

  const addWarningAlert = () => {
    addAlert(AlertTypes.Danger, (
      <div>
        <strong>Danger message.</strong>
        <h2>Something went wrong</h2>
      </div>
    ));
  }

    // // Perform email check when email is available
    // useEffect(() => {
    //   const cookie = getCookie('UserID');
    //   console.log("Nom Nom: ", cookie);
    //   if (email && !cookie) {
    //     const result = checkAndActEmailInDB(email);
    //     console.log('Returned value: ', result)
    //     if(result !== null){
    //       setCookie('UserID', result);
    //     }
    //   }
    // }, [email]);

  return (
    <main>
      <p>Dashboard Page</p>
      <button className='outline-none outline-BTBlue hover:bg-BTBlue-dark px-4 py-2 rounded-md mt-4' onClick={handleOpenModal}>Open Modal</button><br />
      <button className='bg-BTSuccess hover:bg-BTSuccess-dark px-4 py-2 rounded-md mt-4' onClick={handleAddAlertClick}>Add alert</button>
      {/* <AlertsList alerts={alertsData} /> */}
    </main>
  );
}
