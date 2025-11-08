import { useEffect, useMemo, useState } from "react";

export default function Cart({ cart, setCart, onContinue, onCheckout }) {
  const updateQty = (id, delta) => {
    const next = cart
      .map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c))
      .filter((c) => c.qty > 0);
    setCart(next);
  };
  const removeItem = (id) => setCart(cart.filter((c) => c.id !== id));

  const total = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cart]
  );

  return (
    <section className="bg-black text-white py-16 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-gray-400">Your cart is empty. Add something tasty!</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="h-16 w-16 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sky-400 text-sm">₹ {item.price}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 rounded bg-white/10">-</button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 rounded bg-white/10">+</button>
                    <button onClick={() => removeItem(item.id)} className="ml-4 text-red-400 hover:text-red-300">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-fit">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Subtotal</span>
                <span>₹ {total}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-300">Taxes & Fees</span>
                <span>₹ 0</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-lg border-t border-white/10 pt-3">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <button onClick={onCheckout} className="w-full px-4 py-2 rounded bg-sky-500 text-black font-semibold hover:bg-sky-400">Proceed to Checkout</button>
                <button onClick={onContinue} className="w-full px-4 py-2 rounded border border-white/20 text-white hover:bg-white/10">Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
