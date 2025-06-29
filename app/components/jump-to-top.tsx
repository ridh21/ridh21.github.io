"use client"; // This is a client component because it uses hooks (useState, useEffect)

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react"; // A nice, clean icon library

export const JumpToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // This function will be called when the user clicks the button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for a smooth scrolling experience
    });
  };

  // This effect will listen for scroll events
  useEffect(() => {
    const toggleVisibility = () => {
      // If the user has scrolled down more than 300px, show the button
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* The button is only rendered if isVisible is true */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Go to top"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};