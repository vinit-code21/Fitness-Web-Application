"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendStatus, setSendStatus] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (action) => {
    switch (action) {
      case "home":
        // If we're already on the homepage, smoothly scroll to top.
        // Otherwise navigate to the homepage (which will load at top).
        if (pathname === "/" || pathname === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push("/");
        }
        break;
      case "about":
        setShowAbout(true);
        break;
      case "register":
        router.push("/register");
        break;
      case "contact":
        setShowContact(true);
        setSendStatus("");
        break;
      default:
        break;
    }
  };

  const handleSend = async () => {
    if (!message.trim()) {
      setSendStatus("❌ Please write a message");
      return;
    }

    setLoading(true);
    setSendStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setSendStatus("✅ Message sent successfully!");
        setMessage("");
        setTimeout(() => {
          setShowContact(false);
          setSendStatus("");
        }, 2000);
      } else {
        setSendStatus("❌ Failed to send message. Try email below.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSendStatus("❌ Error sending message. Using email instead...");
      // Fallback to mailto
      const mailto = `mailto:vinit17620073@gmail.com?subject=Message%20from%20website&body=${encodeURIComponent(
        message
      )}`;
      window.location.href = mailto;
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#111] border-t border-gray-800 py-12 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-[#C1FFF2] mb-8 pb-8 border-b border-gray-700">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="text-green-400 font-bold text-lg mb-2">
              FitnessPro © {new Date().getFullYear()}
            </div>
            <p className="text-gray-400 text-xs">Your fitness journey starts here</p>
          </div>

          {/* Links */}
          <ul className="flex flex-wrap gap-6 justify-center md:justify-start font-medium">
            <li>
              <button
                onClick={() => handleClick("home")}
                className="hover:text-green-400 transition duration-300 text-gray-300"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("about")}
                className="hover:text-green-400 transition duration-300 text-gray-300"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("register")}
                className="hover:text-green-400 transition duration-300 text-gray-300"
              >
                Register
              </button>
            </li>
            <li>
              <button
                onClick={() => handleClick("contact")}
                className="hover:text-green-400 transition duration-300 text-gray-300"
              >
                Contact
              </button>
            </li>
          </ul>

          {/* Social Links */}
          <div className="flex gap-6 text-2xl">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/fit.vedantt?igsh=czVjYWczeno2cDJ2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition duration-300 transform hover:scale-110"
              title="Follow us on Instagram"
            >
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/917834944196"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400 transition duration-300 transform hover:scale-110"
              title="Chat with us on WhatsApp"
            >
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
            {/* Email */}
            <button
              onClick={() => handleClick("contact")}
              className="text-gray-400 hover:text-green-400 transition duration-300 transform hover:scale-110"
              title="Send us an email"
            >
              <ion-icon name="mail-outline"></ion-icon>
            </button>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-xs text-gray-500">
          <p>Made with ❤️ by FitnessPro Team | All Rights Reserved</p>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
          onClick={() => setShowAbout(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-white/20 transform transition-all duration-300 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-green-400">About FitnessPro</h2>
            <div className="space-y-3 text-gray-200">
              <p>
                FitnessPro is your all-in-one fitness companion designed to help you achieve your health goals.
              </p>
              <p>
                Our platform provides personalized workout plans, nutrition guidance, and progress tracking to keep you motivated on your fitness journey.
              </p>
              <p>
                Whether you're a beginner or advanced, we have everything you need to succeed.
              </p>
            </div>
            <button
              onClick={() => setShowAbout(false)}
              className="mt-6 w-full px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact/Feedback Modal */}
      {showContact && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
          onClick={() => setShowContact(false)}
        >
          <div 
            className="bg-white/10 backdrop-blur-md text-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-white/20 transform transition-all duration-300 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-green-400">Send us a Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              className="w-full h-32 p-3 border border-gray-400/30 rounded-lg mb-4 bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/50 resize-none transition duration-300 disabled:opacity-50"
              placeholder="Write your message..."
            />
            {sendStatus && (
              <p className={`text-sm mb-4 ${sendStatus.includes("✅") ? "text-green-400" : "text-red-400"}`}>
                {sendStatus}
              </p>
            )}
            <div className="flex justify-between gap-3">
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
              <button
                onClick={() => {
                  setShowContact(false);
                  setMessage("");
                  setSendStatus("");
                }}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Or email us directly at: <a href="mailto:vinit17620073@gmail.com" className="text-green-400 hover:underline">vinit17620073@gmail.com</a>
            </p>
          </div>
        </div>
      )}
    </footer>
  );
}
