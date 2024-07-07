import React, {Children, createContext, useState} from 'react';

export const NavContext = createContext(null);

const NavContextProvider = ({children, value}) => {
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
