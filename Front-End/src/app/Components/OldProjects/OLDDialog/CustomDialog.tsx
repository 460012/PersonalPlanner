// // components/CustomDialog.js

// import { Dialog } from '@headlessui/react';
// import { useDialog } from './DialogContext';

// interface CustomDialogProps {
//   title: string;
//   isOpen: boolean; // Add isOpen prop
//   children: React.ReactNode; // Explicitly define children prop
// }

// export const CustomDialog: React.FC<CustomDialogProps> = ({ title, isOpen, children }) => {
//   const { closeDialog } = useDialog();

//   return (
//     <Dialog open={isOpen} onClose={closeDialog}>
//       <Dialog.Title as="h3">{title}</Dialog.Title>
//       <div className="p-6">{children}</div>
//       <div className="flex justify-end p-3">
//         <button onClick={closeDialog}>Close</button>
//       </div>
//     </Dialog>
//   );
// };
