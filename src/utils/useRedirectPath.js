import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to handle GitHub Pages 404.html redirects
 * When 404.html redirects with a query parameter ?p=/path,
 * this hook extracts it and navigates React Router to that path
 */
export const useRedirectPath = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the redirect path was stored by index.html
    if (window.__REDIRECT_PATH__) {
      const redirectPath = window.__REDIRECT_PATH__;
      // Clean up the global variable
      delete window.__REDIRECT_PATH__;
      // Navigate to the intended path
      navigate(redirectPath);
    }
  }, [navigate]);
};

export default useRedirectPath;
