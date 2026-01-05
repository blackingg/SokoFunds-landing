"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import DeviceSelector from "@/components/DeviceSelector";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center bg-white text-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 hero-gradient pointer-events-none opacity-30" />

      <nav className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#007AFF] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(0,122,255,0.2)]">
            <span className="text-white font-black text-2xl italic tracking-tighter">
              S
            </span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-black">
            SokoFunds
          </span>
        </div>
      </nav>

      <section className="w-full max-w-7xl px-8 pt-24 pb-32 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-[#007AFF]/20 text-[#007AFF] text-xs font-black mb-8 tracking-[0.2em] uppercase bg-[#007AFF]/5"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]"></span>
          </span>
          Next Generation Banking
        </motion.div>

        <h1 className="text-7xl md:text-[120px] font-black mb-8 leading-[0.9] tracking-tighter text-black">
          Banking <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-[#007AFF] to-[#0051FF]">
            Simplified.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-black/40 max-w-3xl mb-12 leading-relaxed font-semibold">
          Experience the ultimate financial freedom with SokoFunds.{" "}
          <br className="hidden md:block" />
          Manage cards, track spending, and send money globally.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="#download"
            className="bg-[#007AFF] text-white px-10 py-5 rounded-4xl font-black text-xl hover:bg-[#0051FF] transition-all shadow-[0_20px_40px_rgba(0,122,255,0.2)] hover:scale-105 active:scale-95"
          >
            Download App
          </a>
          <button className="glass px-10 py-5 rounded-4xl font-bold text-xl hover:bg-black/5 transition-all border-black/10">
            Learn More
          </button>
        </div>
      </section>

      <section
        id="features"
        className="w-full py-32 z-10 bg-linear-to-b from-white via-[#007AFF]/5 to-white"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-black uppercase">
              Powerful Features
            </h2>
            <p className="text-xl text-black/40 max-w-2xl mx-auto font-semibold">
              Built for the modern user, SokoFunds provides everything you need
              to manage your wealth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Home",
                img: "/home.png",
                desc: "Real-time balance and transaction history at your fingertips.",
              },
              {
                title: "Cards",
                img: "/cards.png",
                desc: "Securely manage your physical and virtual cards in one place.",
              },
              {
                title: "Send",
                img: "/send.png",
                desc: "Instant global money transfers with Zero commission fees.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group cursor-pointer"
              >
                <div className="relative aspect-9/19 rounded-4xl overflow-hidden glass border-black/5 mb-8 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_40px_80px_rgba(0,122,255,0.1)] bg-white/50">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-3xl font-black mb-3 italic tracking-tight uppercase text-black">
                  {item.title}
                </h3>
                <p className="text-black/40 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="w-full py-40 z-10"
      >
        <DeviceSelector />
      </section>

      <footer className="w-full max-w-7xl px-8 py-20 text-center z-10 border-t border-black/5 mt-20">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-30">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl italic tracking-tighter">
                S
              </span>
            </div>
            <span className="text-xl font-bold tracking-tight text-black">
              SokoFunds
            </span>
          </div>
          <p className="text-black/20 font-bold tracking-[0.2em] italic uppercase">
            DESIGNED FOR THE NEXT GENERATION OF WEALTH
          </p>
          <p className="text-black/70 text-sm font-bold tracking-widest">
            Built with ❤️ by{" "}
            <a
              href="https://mubarakodetunde-portfolio.vercel.app/"
              className="underline text-[#6a97f8] hover:text-[#0051FF] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              blackingg
            </a>
            . All rights reserved &copy; {new Date().getFullYear()}.
          </p>
        </div>
      </footer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 right-6 max-w-xs md:max-w-sm p-6 rounded-4xl glass border-[#007AFF]/20 bg-white/80 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,122,255,0.15)] z-40"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[#007AFF] font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              Frontend Demo Project
            </h3>
            <p className="text-black/60 text-xs font-semibold leading-relaxed mb-3">
              This application is a{" "}
              <span className="text-black">showcase of UI/UX engineering</span>.
              It is not a real financial product and connects to no banking
              services.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider mt-1 text-black/40">
              <span>Built by</span>
              <a
                href="https://mubarakodetunde-portfolio.vercel.app/"
                target="_blank"
                className="text-[#007AFF] hover:underline"
              >
                Mubarak
              </a>
              <span className="opacity-30">|</span>
              <a
                href="https://github.com/blackingg"
                target="_blank"
                className="text-[#007AFF] hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>
          <button
            onClick={(e) =>
              ((
                e.currentTarget.closest("div.fixed") as HTMLElement
              ).style.display = "none")
            }
            className="text-black/20 hover:text-black transition-colors"
          >
            <X
              size={16}
              strokeWidth={3}
            />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
