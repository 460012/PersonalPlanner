// // ThemeContext.tsx
// import React, { createContext, useState, useContext } from 'react';

// // Define the types for your themes
// interface Theme {
//   background: string;
//   text: string;
//   // Add other theme properties as needed
// }

// // Define the context
// interface ThemeContextType {
//   theme: Theme;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// interface ThemeProviderProps {
//   children: React.ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>({
//     background: 'white',
//     text: 'black',
//   });

//   const toggleTheme = () => {
//     setTheme((prevTheme) => ({
//       background: prevTheme.background === 'white' ? 'black' : 'white',
//       text: prevTheme.text === 'black' ? 'white' : 'black',
//     }));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
