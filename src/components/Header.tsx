import { useEffect, useState } from "react";
import { headerContent, HeaderContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Header() {
  const content = useSection<HeaderContent>("header", headerContent);
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
        <strong>{content.brandName}</strong>
        <span className="bar-desc">
          <span className="bar-pipe">·</span> {content.descriptor}
        </span>
      </div>
      <a href={content.ctaLink} className="bar-btn" data-cursor-label="Begin">
        {content.ctaText}
      </a>
    </div>
  );
}
