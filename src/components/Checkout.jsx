import { useMemo, useState } from "react";

export default function Checkout({ cart, onSuccess, onBack }) {
  const total = useMemo(
    () => cart.reduce((sum, it) => sum + it.price * it.qty, 0),
    [cart]
  );

  const [form, setForm] = useState({ name: "", phone: "", table: "" });
  const [processing, setProcessing] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment
    setTimeout(() => {
      setProcessing(false);
      onSuccess({ orderId: Math.random().toString(36).slice(2, 8), eta: 15 });
    }, 1200);
  };

  return (
    <section className="bg-black text-white py-16 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form onSubmit={submit} className="lg:col-span-2 space-y-4 bg-white/5 border border-white/10 rounded-lg p-4">
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
              <button type="button" onClick={onBack} className="px-4 py-2 rounded border border-white/20 text-white hover:bg-white/10">Back to Cart</button>
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
  );
}
