export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Back Bencher Café</div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
