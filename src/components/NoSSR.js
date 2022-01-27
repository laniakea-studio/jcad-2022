import React from "react";

export const NoSSR = ({ children }) => {
  const [render, setRender] = React.useState(false);
  React.useEffect(() => {
    setRender(true);
  }, []);
  if (!render) return <></>;
  return <>{children}</>;
};
