import Spline from '@splinetool/react-spline';

export default function Hero({ onOrderNow }) {
  return (
    <section className="relative min-h-[80vh] w-full bg-black text-white pt-20">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/S4k-6fqjuV5AuVZe/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 py-24 flex flex-col items-start gap-6">
        <div className="backdrop-blur-sm/0"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Back Bencher <span className="text-sky-400">Café</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300">Sip. Snack. Sit Back.</p>
        <div className="flex items-center gap-4">
          <button onClick={onOrderNow} className="px-5 py-3 rounded-md bg-sky-500 hover:bg-sky-400 text-black font-semibold transition">
            Order Now
          </button>
          <a href="#menu" className="px-5 py-3 rounded-md border border-white/20 text-white hover:bg-white/10 transition">View Menu</a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black"></div>
    </section>
  );
}
