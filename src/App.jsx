import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";

function useCartStorage() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("bbc_cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("bbc_cart", JSON.stringify(cart));
  }, [cart]);
  return [cart, setCart];
}

export default function App() {
  const [route, setRoute] = useState("home");
  const [cart, setCart] = useCartStorage();
  const [order, setOrder] = useState(null);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Inline checkout state
  const [form, setForm] = useState({ name: "", phone: "", table: "" });
  const [processing, setProcessing] = useState(false);
  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const orderId = Math.random().toString(36).slice(2, 8);
      const eta = 15;
      setOrder({ orderId, eta });
      setCart([]);
      setRoute("confirmation");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Navbar current={route} onNavigate={setRoute} cartCount={cartCount} />

      {route === "home" && (
        <>
          <Hero onOrderNow={() => setRoute("menu")} />
          <Menu onAdd={addToCart} />
        </>
      )}

      {route === "menu" && <Menu onAdd={addToCart} />}

      {route === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          onContinue={() => setRoute("menu")}
          onCheckout={() => setRoute("checkout")}
        />
      )}

      {route === "checkout" && (
        <section className="bg-black text-white py-16 min-h-[60vh]">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <form onSubmit={handleCheckoutSubmit} className="lg:col-span-2 space-y-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-black border border-white/20 rounded px-3 py-2"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Contact Number</label>
                  <input required pattern="[0-9]{10}" title="Enter 10 digit number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-black border border-white/20 rounded px-3 py-2"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Table Number (optional)</label>
                  <input value={form.table} onChange={(e) => setForm({ ...form, table: e.target.value })} className="w-full bg-black border border-white/20 rounded px-3 py-2"/>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button type="button" onClick={() => setRoute("cart")} className="px-4 py-2 rounded border border-white/20 text-white hover:bg-white/10">Back to Cart</button>
                  <button disabled={processing || total === 0} type="submit" className="px-4 py-2 rounded bg-sky-500 text-black font-semibold hover:bg-sky-400 disabled:opacity-50">
                    {processing ? "Processing..." : `Pay ₹ ${total}`}
                  </button>
                </div>
              </form>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-fit">
                <h3 className="font-semibold mb-2">Order Summary</h3>
                <div className="space-y-2">
                  {cart.map((it) => (
                    <div key={it.id} className="flex items-center justify-between text-sm">
                      <span>{it.name} × {it.qty}</span>
                      <span>₹ {it.price * it.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {route === "about" && (
        <section className="bg-black text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-gray-300">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p>
              Back Bencher Café is your cozy corner for great coffee, comfort food, and good vibes. 
              Designed for in-store and takeaway ordering, we keep things minimal, fast, and delightful.
            </p>
          </div>
        </section>
      )}

      {route === "contact" && (
        <section className="bg-black text-white py-24">
          <div className="max-w-4xl mx-auto px-4 text-gray-300 space-y-2">
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p>Phone: +91-90000 00000</p>
            <p>Address: Back Bencher Café, Your City</p>
          </div>
        </section>
      )}

      {route === "confirmation" && order && (
        <section className="bg-black text-white py-24 min-h-[60vh]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-sky-400 mb-2">Order Successful</h2>
            <p className="text-gray-300">Order ID: {order.orderId}</p>
            <p className="mt-2 text-lg">Estimated preparation time: {order.eta} minutes</p>
            <button onClick={() => setRoute("menu")} className="mt-6 px-5 py-2 rounded bg-sky-500 text-black font-semibold hover:bg-sky-400">Order More</button>
          </div>
        </section>
      )}

      {/* Floating Cart Button */}
      <button
        onClick={() => setRoute("cart")}
        className="fixed bottom-6 right-6 md:hidden rounded-full bg-sky-500 text-black font-semibold shadow-lg px-5 py-3"
      >
        Cart • {cartCount}
      </button>

      <footer className="bg-black text-gray-400 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">© {new Date().getFullYear()} Back Bencher Café</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
