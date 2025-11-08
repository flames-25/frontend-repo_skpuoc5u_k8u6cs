import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

function Logo() {
  const [showImg, setShowImg] = useState(true);
  return (
    <div className="flex items-center gap-2">
      {showImg && (
        <img
          src="/logo.png"
          alt="Back Bencher Café"
          className="h-8 w-8 rounded"
          onError={() => setShowImg(false)}
        />
      )}
      <span className="font-semibold tracking-wide text-white">
        Back Bencher <span className="text-sky-400">Café</span>
      </span>
    </div>
  );
}

export default function Navbar({ current, onNavigate, cartCount }) {
  const links = [
    { key: "home", label: "Home" },
    { key: "menu", label: "Menu" },
    { key: "cart", label: "Cart" },
    { key: "about", label: "About Us" },
    { key: "contact", label: "Contact" },
  ];

  // Sticky shadow on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${
      scrolled ? "bg-black/80 backdrop-blur border-b border-white/10" : "bg-black"
    }`}>
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-3">
          <Logo />
        </button>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => onNavigate(l.key)}
              className={`text-sm transition-colors ${
                current === l.key ? "text-sky-400" : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => onNavigate("cart")}
          className="relative inline-flex items-center gap-2 bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/40 px-3 py-1.5 rounded-md"
        >
          <ShoppingCart size={18} />
          <span className="text-sm">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[10px] font-semibold bg-sky-500 text-white rounded-full h-5 w-5">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
