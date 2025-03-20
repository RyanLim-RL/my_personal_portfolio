import { useEffect, useRef, useState } from "react";

const AutoScroll = () => {
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeout = useRef(null);
  const scrollInterval = useRef(null);

  useEffect(() => {
    // Function to auto-scroll the page
    const autoScroll = () => {
      if (!isUserScrolling) {
        const wrapper = document.querySelector('.projects-page-wrapper');
        if (wrapper) wrapper.scrollBy(0, 1);
      }
    };

    // Function to detect user interaction (wheel, touchmove, keydown)
    const handleUserScroll = (event) => {
      if (event.isTrusted) {
        setIsUserScrolling(true);
        clearInterval(scrollInterval.current); // Stop auto-scrolling
        clearTimeout(scrollTimeout.current); // Reset the restart timer

        // Restart auto-scroll after 5 seconds of no user interaction
        scrollTimeout.current = setTimeout(() => {
          setIsUserScrolling(false);
          startAutoScroll();
        }, 5000);
      }
    };


    const startAutoScroll = () => {
      clearInterval(scrollInterval.current);
      scrollInterval.current = setInterval(autoScroll, 0.01); // Adjust for smoother scrolling
    };
    const wrapper = document.querySelector('.projects-page-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener("wheel", handleUserScroll);
    wrapper.addEventListener("touchmove", handleUserScroll);
    wrapper.addEventListener("keydown", handleUserScroll);

    startAutoScroll();

    return () => {
      wrapper.removeEventListener("wheel", handleUserScroll);
      wrapper.removeEventListener("touchmove", handleUserScroll);
      wrapper.removeEventListener("keydown", handleUserScroll);
      clearInterval(scrollInterval.current);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return null;
};

export default AutoScroll;