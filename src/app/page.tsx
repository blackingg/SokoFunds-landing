"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  CreditCard,
  Link2,
  ArrowUpRight,
  Wallet,
  Send,
  Banknote,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import DeviceSelector from "@/components/DeviceSelector";
import ImageLightbox from "@/components/ImageLightbox";

const PORTFOLIO_URL = "https://www.whoisblxck.xyz/";
const GITHUB_URL = "https://github.com/blackingg";

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

const quickAccess = [
  {
    icon: Zap,
    label: "Instant, fee-free transfers",
    desc: "Move money between SokoFunds accounts instantly, with zero fees — no waiting on legacy rails.",
  },
  {
    icon: CreditCard,
    label: "Cards built to spend",
    desc: "Virtual and physical cards that work the moment you fund your account, not another place to top up.",
  },
  {
    icon: Link2,
    label: "Works with your rails",
    desc: "Top up and cash out through the mobile money and bank channels you already trust.",
  },
];

const howItWorks = [
  {
    icon: Wallet,
    title: "Fund your account",
    desc: "Top up instantly through the mobile money and bank channels you already use, or a direct transfer.",
  },
  {
    icon: Send,
    title: "Send, instantly and free",
    desc: "Move money to any SokoFunds account by number, in seconds — no legacy transfer rails, no fees.",
  },
  {
    icon: CreditCard,
    title: "Spend with cards built for it",
    desc: "Virtual and physical cards draw straight from your balance, ready the moment you fund your account.",
  },
  {
    icon: Banknote,
    title: "Cash out anywhere",
    desc: "Move funds back out through the same mobile money and bank rails, wherever you are.",
  },
];

export default function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Coming back from /download should land where the user left off (the
  // download section), not force them to re-scroll from the top.
  useEffect(() => {
    const target = sessionStorage.getItem("sokofunds:scrollTarget");
    if (target) {
      sessionStorage.removeItem("sokofunds:scrollTarget");
      document.getElementById(target)?.scrollIntoView({
        behavior: "instant" as ScrollBehavior,
        block: "start",
      });
    }
  }, []);

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
    <main className="min-h-screen relative flex flex-col items-center bg-[var(--background)] text-[var(--foreground)]">
      <section className="grain relative w-full overflow-hidden bg-gradient-to-b from-[var(--primary)] to-[var(--primary-2)] pb-40 md:pb-52">
        <div
          className="absolute inset-0 pointer-events-none animate-drift"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 10%, rgba(255,255,255,0.16) 0%, transparent 45%), radial-gradient(circle at 90% 25%, rgba(16,185,129,0.25) 0%, transparent 40%)",
          }}
        />

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="relative w-full max-w-7xl mx-auto px-8 py-8 flex justify-between items-center z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
              <span className="text-[var(--primary)] font-black text-xl italic tracking-tighter font-display">
                S
              </span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-display">
              SokoFunds
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-white/70">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How it works
            </a>
            <a href="#download" className="hover:text-white transition-colors">
              Download
            </a>
          </div>

          <motion.a
            href="#download"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex items-center gap-2 bg-white text-[var(--primary)] px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_10px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)] transition-shadow"
          >
            Get the app
          </motion.a>
        </motion.nav>

        <section className="relative w-full max-w-7xl mx-auto px-8 pt-16 pb-8 flex flex-col items-center text-center z-10">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black mb-8 tracking-[0.2em] uppercase shimmer-badge"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            One account. Every rail.
          </motion.div>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-[104px] font-black mb-8 leading-[0.95] tracking-tighter text-white font-display"
          >
            Your money,
            <br />
            moving instantly.
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed font-medium"
          >
            One SokoFunds account for instant fee-free transfers, everyday
            spending cards, and every mobile money or bank rail you already
            use.
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
              className="bg-white text-[var(--primary)] px-10 py-5 rounded-4xl font-black text-xl transition-shadow shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.28)]"
            >
              Download App
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/10 border border-white/20 px-10 py-5 rounded-4xl font-bold text-xl hover:bg-white/20 transition-colors text-white"
            >
              How it works
            </motion.a>
          </motion.div>
        </section>
      </section>

      {/* White sheet overlapping the blue hero — the same silhouette as the
          app's own Home screen (blue header, rounded white sheet beneath). */}
      <section
        id="trust"
        className="relative w-full max-w-6xl mx-auto px-6 md:px-8 -mt-28 md:-mt-36 z-10"
      >
        <motion.div
          variants={scrollFadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_70px_rgba(17,24,39,0.12)] border border-[var(--line)] px-6 md:px-14 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
        >
          {quickAccess.map((point, i) => (
            <motion.div
              key={point.label}
              variants={scrollFadeUp}
              custom={i * 0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  i === 1
                    ? "bg-[var(--accent)]/10 text-[var(--accent-2)]"
                    : "bg-[var(--primary-soft)] text-[var(--primary)]"
                }`}
              >
                <point.icon size={26} strokeWidth={2.2} />
              </div>
              <h3 className="text-lg font-black tracking-tight">
                {point.label}
              </h3>
              <p className="text-[var(--muted)] text-sm font-medium leading-relaxed max-w-xs">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section
        id="how-it-works"
        className="w-full py-32 z-10 relative bg-white"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20 md:mb-24">
            <motion.h2
              variants={scrollFadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic uppercase font-display"
            >
              How It <span className="text-gradient">Works</span>
            </motion.h2>
            <motion.p
              variants={scrollFadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-xl text-[var(--muted)] max-w-2xl mx-auto font-medium"
            >
              Every SokoFunds account runs on two rails: the mobile money and
              bank channels you already trust, and an instant, fee-free rail
              between SokoFunds accounts.
            </motion.p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-8">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-[var(--line)]" />

            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                variants={scrollFadeUp}
                custom={i * 0.12}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative flex flex-col items-center md:items-start text-center md:text-left gap-5"
              >
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg font-display bg-white border-2"
                  style={{
                    borderColor: i % 2 === 0 ? "var(--primary)" : "var(--accent)",
                    color: i % 2 === 0 ? "var(--primary)" : "var(--accent-2)",
                  }}
                >
                  0{i + 1}
                </div>
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <step.icon size={18} strokeWidth={2.2} />
                  {step.title}
                </h3>
                <p className="text-[var(--muted)] text-sm font-medium leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="w-full py-32 z-10 relative mt-16"
      >
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="text-center mb-24">
            <motion.h2
              variants={scrollFadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight italic uppercase font-display"
            >
              Powerful <span className="text-gradient">Features</span>
            </motion.h2>
            <motion.p
              variants={scrollFadeUp}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-xl text-[var(--muted)] max-w-2xl mx-auto font-medium"
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
                  className="relative aspect-9/19 rounded-[2.5rem] overflow-hidden bg-[var(--background-elevated)] border border-[var(--line)] mb-8 transition-shadow duration-500 shadow-[0_10px_30px_rgba(17,24,39,0.06)] group-hover:shadow-[0_30px_60px_rgba(0,122,255,0.18)]"
                >
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-sm text-[var(--foreground)] font-bold text-xs uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Tap to view
                    </motion.div>
                  </div>
                </motion.div>
                <h3 className="text-3xl font-black mb-3 italic tracking-tight uppercase font-display">
                  {item.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="download"
        className="w-full py-32 z-10 relative bg-[var(--background-elevated)] border-y border-[var(--line)]"
      >
        <DeviceSelector />
      </section>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
        className="w-full border-t border-[var(--line)] bg-[var(--background-elevated)] z-10"
      >
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-14 pb-16">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4 pr-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-lg italic tracking-tighter font-display">
                    S
                  </span>
                </div>
                <span className="text-lg font-bold tracking-tight font-display">
                  SokoFunds
                </span>
              </div>
              <p className="text-[var(--muted)] text-sm font-medium leading-relaxed max-w-xs">
                One account, every rail — banking built for how money
                actually moves.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[var(--muted-2)]">
                Product
              </h4>
              <a href="#features" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                How it works
              </a>
              <a href="#download" className="text-sm font-semibold hover:text-[var(--primary)] transition-colors">
                Download
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[var(--muted-2)]">
                Connect
              </h4>
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--primary)] transition-colors"
              >
                Portfolio <ArrowUpRight size={14} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--primary)] transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="text-sm" /> GitHub
              </a>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.15em] text-[var(--muted-2)]">
                About this project
              </h4>
              <p className="text-[var(--muted)] text-sm font-medium leading-relaxed">
                A frontend showcase of UI/UX engineering — not a real
                financial product, and connected to no banking services.
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--line)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--muted-2)] text-xs font-semibold tracking-wide">
              &copy; {new Date().getFullYear()} SokoFunds. All rights reserved.
            </p>
            <p className="text-[var(--muted)] text-xs font-semibold tracking-wide">
              Built with ❤️ by{" "}
              <a
                href={PORTFOLIO_URL}
                className="text-[var(--primary)] hover:text-[var(--primary-2)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mubarak Odetunde
              </a>
            </p>
          </div>
        </div>
      </motion.footer>

      <ImageLightbox
        images={featureImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
