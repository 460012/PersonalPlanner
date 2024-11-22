// 'use client'

// // Dialogs.js
// import React from 'react';
// import { Dialog } from '@headlessui/react';
// import { useDialog } from './DialogContext';

// interface DialogProps {
//     isOpen: boolean;
//     onClose: () => void;
// }


// export const Dialog1 = () => {
//   const { dialogType, openDialog, closeDialog } = useDialog(); // Use the useDialog hook

//   return (
//     <div>
//       <button onClick={() => openDialog('dialog1')}>Open Dialog 1</button>
//       <Dialog open={dialogType === 'dialog1'} onClose={closeDialog}>
//         <Dialog.Overlay />
//         <Dialog.Title>Hello from Dialog1</Dialog.Title>
//         <Dialog.Description>
//           This is the content of Dialog1.
//         </Dialog.Description>
//       </Dialog>
//     </div>
//   );
// };

// export const Dialog2 = () => {
//   const { dialogType, openDialog, closeDialog } = useDialog(); // Use the useDialog hook

//   return (
//     <div>
//       {/* <button onClick={() => setIsOpen(true)}>Open Dialog 2</button> */}
//       <Dialog open={dialogType === 'dialog2'} onClose={closeDialog}>
//         <Dialog.Overlay />
//         <Dialog.Title>Hello from Dialog2</Dialog.Title>
//         <Dialog.Description>
//           This is the content of Dialog2.
//         </Dialog.Description>
//       </Dialog>
//     </div>
//   );
// };


// export const auth0LogoutDialog: React.FC<DialogProps> = ({ isOpen, onClose }) => {
//   return (
//     <div>
//       <Dialog open={isOpen} onClose={onClose}>
//         <Dialog.Overlay />
//         <Dialog.Title>Hello from Dialog2</Dialog.Title>
//         <Dialog.Description>
//           This is the content of Dialog2.
//         </Dialog.Description>
//       </Dialog>
//     </div>
//   );
// };