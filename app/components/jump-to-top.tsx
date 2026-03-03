"use client"; // This is a client component because it uses hooks (useState, useEffect)

import { useEffect, useState } from "react";
import { IconChevronUp } from "./icons";

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
          className="btn p-2 h-auto rounded-full bg-[var(--color-background-light)] text-[var(--color-contrast-medium)] hover:text-[var(--color-contrast-high)] border border-[var(--color-border)] shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] dark:shadow-[var(--shadow-md),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          aria-label="Go to top"
        >
          <IconChevronUp size={20} />
        </button>
      )}
    </div>
  );
};