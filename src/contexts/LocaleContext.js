import React, { createContext, useState } from "react";

export const LocaleContext = createContext();

const LocaleContextProvider = ({ children, value }) => {
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
