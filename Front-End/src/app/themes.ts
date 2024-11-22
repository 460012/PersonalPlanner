// themes.ts
export interface Theme {
    background: string;
    text: string;
    // Add other theme properties as needed
  }
  
  export const lightTheme: Theme = {
    background: 'white',
    text: 'black',
    // Add other theme properties as needed
  };
  
  export const darkTheme: Theme = {
    background: 'black',
    text: 'white',
    // Add other theme properties as needed
  };
  