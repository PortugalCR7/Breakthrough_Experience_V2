import React, { useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useMagnetic } from "../hooks/useMagnetic";

export default function Checkout() {
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.1 });
  const magneticRef = useMagnetic({ strength: 0.35 });

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");

  // Error States
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasFnError = !firstName.trim();
    const hasLnError = !lastName.trim();
    const hasEmError = !validateEmail(email.trim());

    setErrors({
      firstName: hasFnError,
      lastName: hasLnError,
      email: hasEmError,
    });

    if (!hasFnError && !hasLnError && !hasEmError) {
      setIsSuccess(true);
      // Smooth scroll to top of checkout section on submit success
      const checkoutEl = document.getElementById("checkout");
      if (checkoutEl) {
        checkoutEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="checkout" className="scroll-snap-section" ref={ref as any}>
      <div className="ww">
        <div className="co-g">
          <div className={`fu ${isVisible ? "vis" : ""}`}>
            <div className="co-lbl">SECURE YOUR PLACE</div>
            <div className="co-t">BREAKTHROUGH</div>
            <div className="co-list">
              <div className="co-row">
                <span className="co-ck">✓</span>6 live 1:1 sessions with Frank directly
              </div>
              <div className="co-row">
                <span className="co-ck">✓</span>The Diagnostic — session one
              </div>
              <div className="co-row">
                <span className="co-ck">✓</span>Between-session access — real presence
              </div>
              <div className="co-row">
                <span className="co-ck">✓</span>Brotherhood introduction
              </div>
              <div className="co-row">
                <span className="co-ck">✓</span>Practical integration into real life
              </div>
              <div className="co-row">
                <span className="co-ck">✓</span>Lasting accountability
              </div>
            </div>
          </div>

          <div className={`fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <span className="f-ey">INVESTMENT</span>
            <div className="f-price">$2,500</div>
            <div className="f-pnote">
              Breakthrough · Single Payment · Direct with Frank
            </div>

            {!isSuccess ? (
              <form id="coForm" onSubmit={handleSubmit}>
                <div className="f-row2">
                  <div className="f-field">
                    <label className="f-lbl" htmlFor="fN">
                      First Name
                    </label>
                    <input
                      className={`f-in ${errors.firstName ? "err" : ""}`}
                      type="text"
                      id="fN"
                      autoComplete="given-name"
                      placeholder="First"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <div className={`f-err ${errors.firstName ? "show" : ""}`} id="fNe">
                      Required
                    </div>
                  </div>
                  <div className="f-field">
                    <label className="f-lbl" htmlFor="lN">
                      Last Name
                    </label>
                    <input
                      className={`f-in ${errors.lastName ? "err" : ""}`}
                      type="text"
                      id="lN"
                      autoComplete="family-name"
                      placeholder="Last"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <div className={`f-err ${errors.lastName ? "show" : ""}`} id="lNe">
                      Required
                    </div>
                  </div>
                </div>

                <div className="f-field">
                  <label className="f-lbl" htmlFor="em">
                    Email Address
                  </label>
                  <input
                    className={`f-in ${errors.email ? "err" : ""}`}
                    type="email"
                    id="em"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={`f-err ${errors.email ? "show" : ""}`} id="eme">
                    Valid email required
                  </div>
                </div>

                <div className="f-field">
                  <label className="f-lbl" htmlFor="ph">
                    Phone (optional)
                  </label>
                  <input
                    className="f-in"
                    type="tel"
                    id="ph"
                    autoComplete="tel"
                    placeholder="+1 (000) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="f-field">
                  <label className="f-lbl" htmlFor="pr">
                    Which profile resonates? (optional)
                  </label>
                  <select
                    className="f-in"
                    id="pr"
                    style={{ cursor: "pointer" }}
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  >
                    <option value="">Select if it applies</option>
                    <option value="Successful But Lacking Something">
                      Successful But Lacking Something
                    </option>
                    <option value="Passionate But Struggling">
                      Passionate But Struggling
                    </option>
                    <option value="A Man in Crisis">A Man in Crisis</option>
                  </select>
                </div>

                <div className="f-field" style={{ marginTop: "8px" }}>
                  <button ref={magneticRef as any} type="submit" className="btn-tactile w-full">
                    <span className="btn-tactile-wrap">
                      <span className="btn-tactile-text">Begin Your Breakthrough</span>
                      <span className="btn-tactile-hover">Begin Your Breakthrough</span>
                    </span>
                    <span className="btn-tactile-arrow">→</span>
                  </button>
                </div>
                <p className="f-note">
                  Secure checkout · Frank's team confirms your first session
                  within 24 hours
                </p>
              </form>
            ) : (
              <div className="f-success show" id="coSuccess">
                <div className="fs-icon">◈</div>
                <div className="fs-h">You're in.</div>
                <p className="fs-p">
                  Frank's team will be in touch with you at <strong>{email}</strong> within 24 hours to
                  confirm your first session. You've made the decision. That was the
                  hardest part.
                </p>
                <button
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setProfile("");
                    setIsSuccess(false);
                  }}
                  className="btn-ghost mt-6 text-sm"
                >
                  Register Another Account
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
