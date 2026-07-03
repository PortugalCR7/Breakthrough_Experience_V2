import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { authorityBarContent, AuthorityBarContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

interface CounterProps {
  target: number;
  suffix: string;
  trigger: boolean;
}

function Counter({ target, suffix, trigger }: CounterProps) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start: number | null = null;
    const duration = 1400;

    const run = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Cubic out easing
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(run);
      }
    };

    requestAnimationFrame(run);
  }, [target, trigger]);

  return (
    <span className="auth-n">
      {val}
      {suffix}
    </span>
  );
}

export default function AuthorityBar() {
  const content = useSection<AuthorityBarContent>("authority_bar", authorityBarContent);
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="auth" ref={ref as any}>
      <div className="auth-strip">
        {content.stats.map((stat) => (
          <div key={stat.label} className="auth-cell">
            {stat.isCounter ? (
              <Counter target={Number(stat.value)} suffix={stat.suffix ?? ""} trigger={isVisible} />
            ) : (
              <span className="auth-w">{stat.value}</span>
            )}
            <span className="auth-l">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
