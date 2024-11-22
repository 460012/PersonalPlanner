// 'use client'

// // components/DialogContext.js

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface DialogContextProps {
//   dialogType: string | null;
//   openDialog: (type: string) => void;
//   closeDialog: () => void;
// }

// const DialogContext = createContext<DialogContextProps | undefined>(undefined);

// export const DialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [dialogType, setDialogType] = useState<string | null>(null);

//   const openDialog = (type: string) => {
//     setDialogType(type);
//   };

//   const closeDialog = () => {
//     setDialogType(null);
//   };

//   return (
//     <DialogContext.Provider value={{ dialogType, openDialog, closeDialog }}>
//       {children}
//     </DialogContext.Provider>
//   );
// };

// export const useDialog = () => {
//   const context = useContext(DialogContext);
//   console.log(context)
//   if (!context) {
//     throw new Error('useDialog must be used within a DialogProvider');
//   }
//   return context;
// };
