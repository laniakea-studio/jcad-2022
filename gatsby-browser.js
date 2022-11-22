import React from "react";
import LocaleContextProvider from "./src/contexts/LocaleContext";

/*
export const onRouteUpdate = ({ location }) => {
  window.ldfdr?.pageview({
    pageUrl: location.pathname,
  });
};
*/
export const wrapPageElement = ({ element, props }) => {
  return (
    <LocaleContextProvider
      value={{
        locale: props.pageContext.locale,
        localeSlugs: props.pageContext.localeSlugs,
      }}
    >
      {element}
    </LocaleContextProvider>
  );
};
