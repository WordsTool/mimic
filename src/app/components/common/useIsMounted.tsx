import * as React from 'react';

const useIsMounted = () => {
  const [isMounted, setIsMounted] = React.useState(true);

  React.useEffect(
    () => {
      setIsMounted(true);
    },
    [],
  );

  return isMounted;
};

export default useIsMounted;
