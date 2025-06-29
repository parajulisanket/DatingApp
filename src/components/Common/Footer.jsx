import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-[#22223B] px-4 py-8 text-[#FFF8F0] flex flex-col">
      {/* Newsletter section */}
      <div className="flex flex-col gap-4 mb-8 items-center">
        <h2 className="text-xl font-bold leading-tight text-center">
          Are You In For
          <br />
          The Gossips?
        </h2>
        <form className="w-full flex flex-col gap-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full border-b border-[#FFD6E0] px-3 py-2 outline-none bg-transparent text-base placeholder-[#FFF8F0]"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF3366] to-[#E63946] text-white px-4 py-2 rounded-full font-semibold shadow transition"
          >
            Subscribe Now
          </button>
        </form>
      </div>

      {/* Main Links and About */}
      <div className="border-t border-[#FFD6E0] pt-8 flex flex-col gap-8">
        {/* Brand/About */}
        <div>
          <div className="flex items-center gap-2 mb-2 justify-center">
            <span className="text-xl font-extrabold tracking-tight">
              DatingKIT
            </span>
            <span
              role="img"
              aria-label="heart"
              className="text-pink-500 text-lg"
            >
              ❤️
            </span>
          </div>
          <p className="text-center text-xs mb-2">
            Mauris mattis lacinia turpis sit amet convallis. Aliquam congue
            vehicula cursus. Aenean eget lacus in metus malesuada lacinia ac
            vitae velit. Fusce elementum fringilla mattis. Donec quis dolor
            orci.
          </p>
        </div>
        {/* Links */}
        <div className="flex flex-col gap-8 text-center">
          {/* Community */}
          <div>
            <h3 className="font-bold mb-2">Community</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="/guidelines">Guidelines</a>
              </li>
              <li>
                <a href="/success">Success Stories</a>
              </li>
              <li>
                <a href="/plenty">Plenty of Interests</a>
              </li>
              <li>
                <a href="/city">Plenty of Cities</a>
              </li>
              <li>
                <a href="/blog">The Blog</a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="/support">Support</a>
              </li>
              <li>
                <a href="/security">Security</a>
              </li>
              <li>
                <a href="/safety">Safety Tips</a>
              </li>
              <li>
                <a href="/impresssum">Impressum</a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="font-bold mb-2">Legal & Privacy</h3>
            <ul className="space-y-1 text-xs">
              <li>
                <a href="/services">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/data">Consumer Health Data Policy</a>
              </li>
              <li>
                <a href="/policy">Cookie Policy</a>
              </li>
              <li>
                <a href="/property">Intellectual Property</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col justify-center items-center border-t border-[#FFD6E0] pt-4 mt-6 gap-2 text-[11px]">
        <p className="text-center">&copy;DesignThemes all rights Reserved</p>
        <div className="flex gap-2 justify-center">
          {/* Payment method icons */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="Mastercard"
            className="h-4"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="h-4"
          />
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/apple-pay-27-434158.png"
            alt="Apple Pay"
            className="h-4"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="h-4"
          />
        </div>
      </div>
    </div>
  );
}
