import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback((url, applyData) => {
    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        applyData(data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  return {
    fetchData,
    isLoading,
    error,
    setIsLoading,
  };
};

export default useHttp;
