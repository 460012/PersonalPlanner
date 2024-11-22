// // components/DialogProvider.js

// import { Dialog } from '@headlessui/react';
// import { createContext, useContext, useState, ReactNode } from 'react';

// const DialogContext = createContext<any>(null);

// export const useDialog = () => {
//   return useContext(DialogContext);
// };

// interface DialogProviderProps {
//   children: ReactNode;
// }

// export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [content, setContent] = useState<ReactNode | null>(null);

//   const openDialog = (content: ReactNode) => {
//     setContent(content);
//     setIsOpen(true);
//   };

//   const closeDialog = () => {
//     setContent(null);
//     setIsOpen(false);
//   };

//   return (
//     <DialogContext.Provider value={{ openDialog, closeDialog }}>
//       {children}
//       <Dialog open={isOpen} onClose={closeDialog}>
//         {content}
//       </Dialog>
//     </DialogContext.Provider>
//   );
// };
