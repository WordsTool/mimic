import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

export interface CurrentLocation {
  pathname: string,
  host: string,
  search: string,
  origin: string,
}

const getCurrentLocation = (): CurrentLocation => {
  const {
    pathname,
    host,
    search,
    origin,
  } = window.location;

  return {
    pathname,
    host,
    search,
    origin,
  };
};

const useCurrentLocation = (): CurrentLocation => {
  const [location, setLocation] = useState<CurrentLocation>(getCurrentLocation());
  const setLocationCallback = useCallback(() => setLocation(getCurrentLocation()), []);

  useEffect(() => {
    window.addEventListener('popstate', setLocationCallback);

    return () => {
      window.removeEventListener('popstate', setLocationCallback);
    };
  }, []);

  return location;
};

export default useCurrentLocation;
