import React, { createContext } from "react";

export const LocaleContext = createContext({
  locale: "fi",
  prefix: "/",
  localeSlugs: {
    fi: "/",
    en: "/en",
    sv: "/sv",
  },
});

const LocaleContextProvider = ({ children, value }) => {
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
