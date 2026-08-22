import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const scrollToElement = (hash, retries = 10) => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (retries > 0) {
          setTimeout(() => scrollToElement(hash, retries - 1), 100);
        }
      };

      scrollToElement(location.hash);
    }
  }, [location.hash]);
};

export default useScrollToHash;
