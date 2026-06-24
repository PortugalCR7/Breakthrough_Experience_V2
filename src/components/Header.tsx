import { useEffect, useState } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky bar on when scrolled > 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="bar" className={isVisible ? "on" : ""}>
      <div className="bar-left">
        <strong>BREAKTHROUGH</strong>
        <span className="bar-desc">
          <span className="bar-pipe">·</span> 6 Sessions
          <span className="bar-pipe">·</span> 1:1 with Frank
        </span>
      </div>
      <a href="#checkout" className="bar-btn" data-cursor-label="Begin">
        Begin Your Breakthrough →
      </a>
    </div>
  );
}
