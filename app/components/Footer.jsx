'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Correct import for App Router

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter(); // ✅ create router object

  const handleClick = (action) => {
    switch (action) {
      case 'home':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'about':
        setShowAbout(true);
        break;
      case 'register':
        router.push('/register'); // ✅ this now works
        break;
      case 'contact':
        setShowContact(true);
        break;
      default:
        break;
    }
  };

  const handleSend = () => {
    const mailto = `mailto:vinit17620073@gmail.com?subject=Message%20from%20website&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };

  return (
    <footer className="bg-[#1d1f1a] border-t border-[#2e3228] py-6 px-4 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-[#C1FFF2]">

        {/* Left: Logo */}
        <div className="font-semibold text-[#80FF72] text-lg">
          <span className="font-bold">Fitness App</span> © {new Date().getFullYear()}
        </div>

        {/* Center: Buttons */}
        <ul className="flex flex-wrap gap-6 mt-4 md:mt-0 justify-center text-[#C1FFF2] font-medium">
          <li><button onClick={() => handleClick('home')} className="hover:text-[#80FF72] transition">Home</button></li>
          <li><button onClick={() => handleClick('about')} className="hover:text-[#80FF72] transition">About</button></li>
          <li><button onClick={() => handleClick('register')} className="hover:text-[#80FF72] transition">Register</button></li>
          <li><button onClick={() => handleClick('contact')} className="hover:text-[#80FF72] transition">Feedback</button></li>
        </ul>

        {/* Right: Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-twitter" className="text-xl text-[#1DA1F2]"></ion-icon></a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-dribbble" className="text-xl text-pink-500"></ion-icon></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><ion-icon name="logo-instagram" className="text-xl text-[#E1306C]"></ion-icon></a>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-[#2E3C36] border border-white/10 backdrop-blur-lg text-white p-8 rounded-xl shadow-xl max-w-md w-full pointer-events-auto">
            <h2 className="text-xl font-bold mb-4">About This Website</h2>
            <p>This website is built to guide users through fitness, workouts, and healthy lifestyle plans.</p>
            <button onClick={() => setShowAbout(false)} className="mt-4 px-4 py-2 bg-black text-white rounded">Close</button>
          </div>
        </div>
      )}

      {/*Feedback Modal */}
      {showContact && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-[#2E3C36] border border-white/10 backdrop-blur-lg text-white p-8 rounded-xl shadow-xl max-w-md w-full pointer-events-auto">
            <h2 className="text-xl font-bold mb-4">Send a Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
              placeholder="Write your message..."
            />
            <div className="flex justify-between">
              <button onClick={handleSend} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
              <button onClick={() => setShowContact(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}