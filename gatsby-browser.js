import React from "react";
import LocaleContextProvider from "./src/contexts/LocaleContext";

export const wrapPageElement = ({ element, props }) => {
  return (
    <LocaleContextProvider
      value={{
        locale: props.pageContext.locale,
        prefix: props.pageContext.prefix,
        localeSlugs: props.pageContext.localeSlugs,
      }}
    >
      {element}
    </LocaleContextProvider>
  );
};
