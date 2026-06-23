import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="auth" ref={ref as any}>
      <div className="auth-strip">
        <div className="auth-cell">
          <Counter target={20} suffix="+" trigger={isVisible} />
          <span className="auth-l">YEARS OF LEADERSHIP</span>
        </div>
        <div className="auth-cell">
          <span className="auth-w">MONDE OSÉ</span>
          <span className="auth-l">FOUNDER</span>
        </div>
        <div className="auth-cell">
          <Counter target={75} suffix="+" trigger={isVisible} />
          <span className="auth-l">INTERNATIONAL TRAININGS</span>
        </div>
        <div className="auth-cell">
          <span className="auth-w">TEACHER</span>
          <span className="auth-l">OF TEACHERS</span>
        </div>
        <div className="auth-cell">
          <span className="auth-w">BUILDER</span>
          <span className="auth-l">OF INTENTIONAL COMMUNITIES</span>
        </div>
      </div>
    </section>
  );
}
