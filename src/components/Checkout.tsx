import React, { useRef, useState } from "react";
import { useScrollFadeIn } from "../hooks/useScrollFadeIn";
import { useMagnetic } from "../hooks/useMagnetic";
import { useWordScrub } from "../motion";
import { checkoutContent, CheckoutContent } from "../data/pageContent";
import { useSection } from "../providers/contentProvider";

export default function Checkout() {
  const content = useSection<CheckoutContent>("checkout", checkoutContent);
  const [ref, isVisible] = useScrollFadeIn({ threshold: 0.1 });
  // The magnetic pull is reserved for THE primary CTA — the one button that
  // actually acts (the join submit). Capped to 0.15 so it reads as a settled
  // tactile pull, not toy physics. Constitution §IX. Every other CTA on the
  // page is navigation and uses the standard btn-tactile treatment.
  const magneticRef = useMagnetic({ strength: 0.15 });
  const coTitleRef = useRef<HTMLHeadingElement | null>(null);
  useWordScrub(coTitleRef);

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

  // Split successBody on {email} token to preserve bold email rendering
  const successParts = content.successBody.split('{email}');

  return (
    <section id="checkout" className="scroll-snap-section" ref={ref as any}>
      <div className="ww">
        <div className="co-g">
          <div className={`fu ${isVisible ? "vis" : ""}`}>
            <div className="co-lbl">{content.sectionLabel}</div>
            <h2 ref={coTitleRef} className="co-t">
              <span className="word-reveal-span">{content.headline}</span>
            </h2>
            <div className="co-list">
              {content.checklistItems.map((item, i) => (
                <div key={i} className="co-row">
                  <span className="co-ck">✓</span>{item}
                </div>
              ))}
            </div>
          </div>

          <div className={`fu ${isVisible ? "vis" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <span className="f-ey">{content.investmentLabel}</span>
            <div className="f-price">{content.investmentPrice}</div>
            <div className="f-pnote">
              {content.investmentNote}
            </div>

            {!isSuccess ? (
              <form id="coForm" onSubmit={handleSubmit}>
                <div className="f-row2">
                  <div className="f-field">
                    <label className="f-lbl" htmlFor="fN">
                      {content.formLabels.firstName}
                    </label>
                    <input
                      className={`f-in ${errors.firstName ? "err" : ""}`}
                      type="text"
                      id="fN"
                      autoComplete="given-name"
                      placeholder="First"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      aria-invalid={errors.firstName}
                      aria-describedby={errors.firstName ? "fNe" : undefined}
                    />
                    <div className={`f-err ${errors.firstName ? "show" : ""}`} id="fNe" role="alert">
                      Required
                    </div>
                  </div>
                  <div className="f-field">
                    <label className="f-lbl" htmlFor="lN">
                      {content.formLabels.lastName}
                    </label>
                    <input
                      className={`f-in ${errors.lastName ? "err" : ""}`}
                      type="text"
                      id="lN"
                      autoComplete="family-name"
                      placeholder="Last"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      aria-invalid={errors.lastName}
                      aria-describedby={errors.lastName ? "lNe" : undefined}
                    />
                    <div className={`f-err ${errors.lastName ? "show" : ""}`} id="lNe" role="alert">
                      Required
                    </div>
                  </div>
                </div>

                <div className="f-field">
                  <label className="f-lbl" htmlFor="em">
                    {content.formLabels.email}
                  </label>
                  <input
                    className={`f-in ${errors.email ? "err" : ""}`}
                    type="email"
                    id="em"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={errors.email}
                    aria-describedby={errors.email ? "eme" : undefined}
                  />
                  <div className={`f-err ${errors.email ? "show" : ""}`} id="eme" role="alert">
                    Valid email required
                  </div>
                </div>

                <div className="f-field">
                  <label className="f-lbl" htmlFor="ph">
                    {content.formLabels.phone}
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
                    {content.formLabels.profile}
                  </label>
                  <select
                    className="f-in"
                    id="pr"
                    style={{ cursor: "pointer" }}
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  >
                    <option value="">Select if it applies</option>
                    {content.profileOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="f-field" style={{ marginTop: "8px" }}>
                  <button ref={magneticRef as any} type="submit" className="btn-tactile cta-primary w-full" data-cursor-label="Join">
                    <span className="btn-tactile-wrap">
                      <span className="btn-tactile-text">{content.submitText}</span>
                      <span className="btn-tactile-hover">{content.submitText}</span>
                    </span>
                    <span className="btn-tactile-arrow">→</span>
                  </button>
                </div>
                <p className="f-note">{content.formNote}</p>
              </form>
            ) : (
              <div className="f-success show" id="coSuccess">
                <div className="fs-icon">{content.successIcon}</div>
                <div className="fs-h">{content.successHeadline}</div>
                <p className="fs-p">
                  {successParts[0]}<strong>{email}</strong>{successParts[1]}
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
                  {content.resetButtonText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
