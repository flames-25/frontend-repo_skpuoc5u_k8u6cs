import { useEffect, useState } from "react";

const CATEGORIES = [
  { key: "appetizers", title: "Appetizers" },
  { key: "maggie_pasta", title: "Maggie & Pasta" },
  { key: "pizza_burger", title: "Pizza & Burger" },
  { key: "fries_chat", title: "Fries & Chat" },
];

// Sample café menu items. In a real app, these could come from backend.
const MENU = [
  { id: "a1", category: "appetizers", name: "Garlic Bread", price: 129, img: "https://images.unsplash.com/photo-1546549039-49e5e95ebbd5?q=80&w=800&auto=format&fit=crop" },
  { id: "a2", category: "appetizers", name: "Cheese Balls", price: 149, img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" },
  { id: "m1", category: "maggie_pasta", name: "Masala Maggi", price: 99, img: "https://images.unsplash.com/photo-1604909052743-3b3b38e8c53d?q=80&w=800&auto=format&fit=crop" },
  { id: "m2", category: "maggie_pasta", name: "Creamy Pasta", price: 179, img: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?q=80&w=800&auto=format&fit=crop" },
  { id: "p1", category: "pizza_burger", name: "Margherita Pizza", price: 249, img: "https://images.unsplash.com/photo-1548366086-7c1b3c1c7c53?q=80&w=800&auto=format&fit=crop" },
  { id: "p2", category: "pizza_burger", name: "Veggie Burger", price: 179, img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=800&auto=format&fit=crop" },
  { id: "f1", category: "fries_chat", name: "Masala Fries", price: 129, img: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=800&auto=format&fit=crop" },
  { id: "f2", category: "fries_chat", name: "Bhel Puri", price: 119, img: "https://images.unsplash.com/photo-1604908554057-2593b9ea9f5b?q=80&w=800&auto=format&fit=crop" },
];

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default function Menu({ onAdd }) {
  const [active, setActive] = useLocalStorage("activeCategory", "appetizers");

  const filtered = MENU.filter((m) => m.category === active);

  return (
    <section id="menu" className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Menu</h2>
          <div className="flex gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`px-3 py-1.5 rounded-full text-sm border ${
                  active === c.key
                    ? "bg-sky-500 text-black border-sky-500"
                    : "border-white/20 text-gray-300 hover:text-white"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
            >
              <img src={item.img} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sky-400">₹ {item.price}</p>
                </div>
                <button
                  onClick={() => onAdd(item)}
                  className="px-3 py-1.5 rounded-md bg-sky-500 text-black font-medium hover:bg-sky-400"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
