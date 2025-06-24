import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-white mt-16 px-4 pt-16 pb-6 text-black border-t">
      {/* Newsletter section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="mb-8 md:mb-0 md:w-1/2">
          <h2 className="text-4xl sm:text-6xl font-bold mb-2 leading-tight">Are You In For<br />The Gossips?</h2>
        </div>
        <form className="flex flex-col md:flex-row items-center gap-3 w-full md:w-1/2 md:justify-end">
          <input
            type="email"
            placeholder="enter Your email address"
            className="w-full md:w-80 border-b-2 border-gray-400 px-3 py-2 outline-none bg-transparent text-lg placeholder-gray-500"
          />
          <button
            type="submit"
            className="mt-2 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-400 text-white px-6 py-3 rounded-full font-semibold shadow hover:from-pink-600 hover:to-red-500 transition"
          >
            Register Now
            <span role="img" aria-label="heart" className="text-2xl">❤️</span>
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-200 pt-10 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
        {/* Left side: Brand & about */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl font-extrabold tracking-tight">SagarXXX</span>
            <span role="img" aria-label="heart" className="text-pink-500 text-2xl">❤️</span>
          </div>
          <p className="text-gray-500 mb-4">
            Mauris mattis lacinia turpis sit amet convallis. Aliquam congue vehicula cursus. 
            Aenean eget lacus in metus malesuada lacinia ac vitae velit. Fusce elementum fringilla mattis. Donec quis dolor orci.
          </p>
        </div>
        {/* Middle columns */}
        <div className="flex flex-1 flex-col sm:flex-row justify-between gap-12">
          {/* Community */}
          <div>
            <h3 className="font-bold text-lg mb-3">Community</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/guidelines">Guidelines</a></li>
              <li><a href="/success">Success Stories</a></li>
              <li><a href="/plenty">Plenty of Interests</a></li>
              <li><a href="/city">Plenty of Cities</a></li>
              <li><a href="/blog">The Blog</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/support">Support</a></li>
              <li><a href="/security">Security</a></li>
              <li><a href="/safety">Safety Tips</a></li>
              <li><a href="/impresssum">Impressum</a></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-3">Legal & Privacy</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="/services">Terms of Service</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/data">Consumer Health Data Policy</a></li>
              <li><a href="/policy">Cookie Policy</a></li>
              <li><a href="/property">Intellectual Property</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 mt-8">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          &copy;DesignThemes all rights Reserved
        </p>
        <div className="flex gap-3">
          {/* Payment method icons (replace with real icons as needed) */}
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" className="h-6" />
          <img src="https://cdn.iconscout.com/icon/free/png-256/apple-pay-27-434158.png" alt="Apple Pay" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
        </div>
      </div>
    </footer>
  );
}
