import React, { useState } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [colorTheme, setcolorTheme] = useState("dark");
  return (
    <AppContext.Provider value={{ colorTheme, setcolorTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
