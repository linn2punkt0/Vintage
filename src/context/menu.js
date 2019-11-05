import React, { useState, createContext } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ menuIsOpen, setMenuIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => React.useContext(MenuContext);

export { MenuProvider, useMenu };
