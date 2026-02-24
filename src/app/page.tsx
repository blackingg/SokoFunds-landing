"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DeviceSelector from "@/components/DeviceSelector";
import ImageLightbox from "@/components/ImageLightbox";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease },
  }),
};

const scrollFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease },
  }),
};

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const featureImages = [
    {
      title: "Home",
      src: "/home.png",
      desc: "Real-time balance and transaction history at your fingertips.",
    },
    {
      title: "Cards",
      src: "/cards.png",
      desc: "Securely manage your physical and virtual cards in one place.",
    },
    {
      title: "Send",
      src: "/send.png",
      desc: "Instant global money transfers with Zero commission fees.",
    },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center bg-white text-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-200 hero-gradient pointer-events-none opacity-30" />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-50"
      >
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
      </motion.nav>

      <section className="w-full max-w-7xl px-8 pt-24 pb-32 flex flex-col items-center text-center z-10">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-[#007AFF]/20 text-[#007AFF] text-xs font-black mb-8 tracking-[0.2em] uppercase bg-[#007AFF]/5 shimmer-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007AFF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007AFF]"></span>
          </span>
          Next Generation Banking
        </motion.div>

        <motion.h1
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-7xl md:text-[120px] font-black mb-8 leading-[0.9] tracking-tighter text-black"
        >
          Banking <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-[#007AFF] to-[#0051FF]">
            Simplified.
          </span>
        </motion.h1>

        <motion.p
          custom={0.2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-black/40 max-w-3xl mb-12 leading-relaxed font-semibold"
        >
          Experience the ultimate financial freedom with SokoFunds.{" "}
          <br className="hidden md:block" />
          Manage cards, track spending, and send money globally.
        </motion.p>

        <motion.div
          custom={0.35}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.a
            href="#download"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#007AFF] text-white px-10 py-5 rounded-4xl font-black text-xl hover:bg-[#0051FF] transition-colors shadow-[0_20px_40px_rgba(0,122,255,0.2)]"
          >
            Download App
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="glass px-10 py-5 rounded-4xl font-bold text-xl hover:bg-black/5 transition-colors border-black/10"
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>

      <section
        id="features"
        className="w-full py-32 z-10 bg-linear-to-b from-white via-[#007AFF]/5 to-white"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <motion.h2
              variants={scrollFadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic text-black uppercase"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              variants={scrollFadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-xl text-black/40 max-w-2xl mx-auto font-semibold"
            >
              Built for the modern user, SokoFunds provides everything you need
              to manage your wealth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featureImages.map((item, i) => (
              <motion.div
                key={i}
                variants={scrollFadeUp}
                custom={i * 0.12}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="group cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.35 } }}
                  className="relative aspect-9/19 rounded-4xl overflow-hidden glass border-black/5 mb-8 transition-shadow duration-500 group-hover:shadow-[0_40px_80px_rgba(0,122,255,0.1)] bg-white/50"
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  {/* Tap to view overlay hint */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm text-black font-bold text-xs uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Tap to view
                    </motion.div>
                  </div>
                </motion.div>
                <h3 className="text-3xl font-black mb-3 italic tracking-tight uppercase text-black">
                  {item.title}
                </h3>
                <p className="text-black/40 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </motion.div>
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

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="w-full max-w-7xl px-8 py-20 text-center z-10 border-t border-black/5 mt-20"
      >
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
      </motion.footer>

      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                  <span className="text-black">
                    showcase of UI/UX engineering
                  </span>
                  . It is not a real financial product and connects to no
                  banking services.
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider mt-1 text-black/40">
                  <span>Built by</span>
                  <a
                    href="https://www.whoisblxck.xyz/"
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
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDisclaimer(false)}
                className="text-black/20 hover:text-black transition-colors flex-shrink-0"
              >
                <X
                  size={16}
                  strokeWidth={3}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox
        images={featureImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
