export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="w">
        <p className="foot-logo">
          BREAK<span className="sv">THROUGH</span>
        </p>
        <p className="foot-sub text-neutral-400">
          Frank Mondeose · Monde Osé · Breakthrough · Caracara Village + Nature Reserve · © {currentYear}
        </p>
        <div className="foot-links mt-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Terms and policy configurations will load securely in production.");
            }}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Default terms of mentorship services.");
            }}
          >
            Terms
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Frank's leadership support desk: admin@mondeose.com");
            }}
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
