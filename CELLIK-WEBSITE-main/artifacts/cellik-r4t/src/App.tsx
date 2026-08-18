import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Eye, Camera, MessageSquare, Layers, Activity,
  Folder, Smartphone, Key, Check, ChevronRight, MessageCircle,
  Star, ArrowRight, Menu, X
} from "lucide-react";

const SUPPORT_URL = "https://t.me/CELLIKBACKUP";
const LOGO = "/logo-nobg.png";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setIsDark(window.scrollY < window.innerHeight * 0.85);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Workflow", href: "#workflow" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: SUPPORT_URL, external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isDark ? "apple-nav-dark" : "apple-nav-light"}`}
      style={{ height: 44 }}>
      <div className="max-w-[980px] mx-auto px-5 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 shrink-0">
          <img src={LOGO} alt="CELLIK R4T" className="h-7 w-auto object-contain" style={{ filter: "drop-shadow(0 0 6px rgba(255,59,48,0.5))" }} />
          <span className={`font-semibold text-sm tracking-tight ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>
            CELLIK <span className="text-[#ff3b30]">R4T</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <a key={l.label} href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className={`text-[13px] transition-colors ${isDark ? "text-white/70 hover:text-white" : "text-[#1d1d1f]/70 hover:text-[#1d1d1f]"}`}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#pricing" className="hidden md:inline text-[13px] text-[#ff3b30] hover:underline underline-offset-2 font-medium">
          Get Access
        </a>

        <button className={`md:hidden p-1 ${isDark ? "text-white/70" : "text-[#1d1d1f]/70"}`}
          onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`md:hidden px-6 py-5 flex flex-col gap-5 border-t ${isDark ? "apple-nav-dark border-white/10" : "apple-nav-light border-black/10"}`}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              target={l.external ? "_blank" : undefined}
              className={`text-base ${isDark ? "text-white/80" : "text-[#1d1d1f]/80"}`}>{l.label}</a>
          ))}
          <a href="#pricing" onClick={() => setOpen(false)} className="text-[#ff3b30] text-base font-medium">Get Access</a>
        </motion.div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// HERO MOCKUP — responsive height
// ─────────────────────────────────────────────
function HeroMockup() {
  return (
    <div className="app-frame w-full overflow-hidden">
      <div className="app-frame-bar">
        <div className="window-dot bg-[#ff5f57]" />
        <div className="window-dot bg-[#febc2e]" />
        <div className="window-dot bg-[#28c840]" />
        <div className="mx-auto font-mono text-[11px] text-white/25">cellik-r4t — control panel</div>
      </div>
      <div className="flex" style={{ minHeight: 0 }}>
        {/* Sidebar — hidden on mobile */}
        <div className="w-44 border-r border-white/5 hidden sm:flex flex-col p-3 gap-0.5 shrink-0">
          <div className="px-2 py-3 mb-2 flex items-center gap-2">
            <img src={LOGO} alt="" className="h-5 w-auto" style={{ filter: "drop-shadow(0 0 4px rgba(255,59,48,0.6))" }} />
            <span className="text-[11px] font-semibold text-white/80 tracking-wide">CELLIK R4T</span>
          </div>
          {[
            { icon: Eye, label: "Live View", active: true },
            { icon: Camera, label: "Camera" },
            { icon: MessageSquare, label: "Messages" },
            { icon: Folder, label: "Files" },
            { icon: Layers, label: "Overlays" },
            { icon: Activity, label: "Keylogger" },
          ].map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] cursor-pointer ${item.active ? "bg-[#ff3b30]/15 text-[#ff6b6b]" : "text-white/35"}`}>
              <item.icon className="w-3.5 h-3.5 shrink-0" />
              {item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 gap-3">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Devices", val: "14", color: "text-white" },
              { label: "GPS", val: "LIVE", color: "text-[#ff6b6b]" },
              { label: "Stealth", val: "ON", color: "text-emerald-400" },
            ].map((s) => (
              <div key={s.label} className="card-dark-sm p-2 sm:p-3">
                <div className="text-[9px] sm:text-[10px] text-white/30 mb-1">{s.label}</div>
                <div className={`text-base sm:text-lg font-bold ${s.color}`}>{s.val}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 sm:gap-3" style={{ height: 160 }}>
            <div className="flex-1 card-dark-sm p-2 sm:p-3 flex flex-col overflow-hidden">
              <div className="flex justify-between mb-2">
                <span className="text-[9px] text-white/30 uppercase tracking-wider">Activity</span>
                <span className="text-[9px] text-emerald-400">● Live</span>
              </div>
              <div className="flex-1 flex items-end gap-0.5 sm:gap-1">
                {[38,58,22,72,44,85,52,78,30,68,48,80,36,62,92,50,74,28].map((h, i) => (
                  <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
                    style={{ height: `${h}%`, originY: 1 }}
                    className="flex-1 rounded-t-sm bg-[#ff3b30]/30" />
                ))}
              </div>
            </div>

            <div className="w-28 sm:w-36 card-dark-sm p-2 sm:p-3 flex flex-col overflow-hidden">
              <div className="text-[9px] text-white/30 border-b border-white/5 pb-1.5 mb-1.5 uppercase tracking-wider">Live Log</div>
              <div className="flex-1 overflow-hidden font-mono text-[8px] sm:text-[9px] text-emerald-400/70">
                <div className="animate-terminal flex flex-col gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i}>{["SMS captured","Screen snap","GPS ping","Keylog saved","Call log","File upload","Overlay on","Notif read"][i % 8]}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom quick actions — visible on mobile too */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
            {["Screen","SMS","Camera","GPS","Files","Overlay"].map((b) => (
              <div key={b} className="h-7 rounded-lg bg-[#ff3b30]/8 border border-[#ff3b30]/15 flex items-center justify-center text-[9px] sm:text-[10px] text-[#ff6b6b] font-medium">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 70]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000]" style={{ paddingTop: 44 }}>
      <div className="radial-glow w-[400px] h-[300px] bg-[#ff3b30]/8 top-0 left-1/2 -translate-x-1/2" />

      <motion.div style={{ opacity }}
        className="relative z-10 w-full max-w-[980px] mx-auto px-5 sm:px-6 flex flex-col items-center text-center py-12 sm:py-16">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6 animate-float">
          <img src={LOGO} alt="CELLIK R4T"
            className="h-24 sm:h-32 md:h-40 w-auto object-contain"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,59,48,0.4)) drop-shadow(0 0 80px rgba(255,59,48,0.15))" }} />
        </motion.div>

        <motion.p variants={reveal} initial="hidden" animate="show" custom={0}
          className="eyebrow eyebrow-red mb-3">
          Android 7.0 — 16+ · No Root Required
        </motion.p>

        <motion.h1 variants={reveal} initial="hidden" animate="show" custom={1}
          className="display-xl text-white mb-4">
          Full Android<br />
          <span className="gradient-red-dark">Remote Access.</span>
        </motion.h1>

        <motion.p variants={reveal} initial="hidden" animate="show" custom={2}
          className="text-base sm:text-lg text-white/50 max-w-[440px] mb-8 leading-relaxed">
          Screen. Camera. Files. SMS. Location.<br className="hidden sm:block" />
          Banking overlays — all invisibly.
        </motion.p>

        <motion.div variants={reveal} initial="hidden" animate="show" custom={3}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full max-w-xs sm:max-w-none sm:w-auto">
          <a href="#pricing" className="btn-red justify-center sm:justify-start">
            Get Access <ChevronRight className="w-4 h-4" />
          </a>
          <a href="#features" className="btn-white-outline justify-center sm:justify-start">
            Explore Features
          </a>
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ y }}
          className="w-full max-w-3xl">
          <HeroMockup />
        </motion.div>

        {/* Spec pills */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-8">
          {["No root","Android 7–16+","250+ overlays","FUD crypter","No port forwarding","Hidden icon"].map((p) => (
            <span key={p} className="text-[12px] text-white/35 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#ff3b30] inline-block shrink-0" />
              {p}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FEATURE SHOWCASE
// ─────────────────────────────────────────────
const showcaseFeatures = [
  {
    eyebrow: "Remote Control",
    headline: ["See every screen.", "Control every touch."],
    body: "Real-time screen viewing with full touch simulation. Screen recording via FFMPEG, on-demand screenshots, and remote reboot or shutdown — all from your browser.",
    bg: "#fff",
    visual: () => (
      <div className="card-gray p-5 sm:p-7 w-full">
        <div className="flex items-center justify-between mb-4">
          <span className="eyebrow text-[#6e6e73]">Remote Screen</span>
          <span className="text-[10px] text-emerald-600 font-semibold">● Live</span>
        </div>
        <div className="bg-[#1d1d1f] rounded-xl overflow-hidden relative" style={{ paddingBottom: "52%" }}>
          <div className="absolute inset-0 flex flex-col p-3 gap-2 opacity-20">
            <div className="h-3 bg-white/30 rounded w-full" />
            <div className="flex gap-2"><div className="flex-1 bg-white/15 rounded h-14" /><div className="w-16 bg-white/15 rounded h-14" /></div>
            <div className="h-2 bg-white/10 rounded w-3/4" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="w-9 h-9 text-[#ff3b30]/40" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {["Touch","Record","Screenshot"].map((b) => (
            <button key={b} className="py-2 rounded-lg bg-white border border-black/8 text-[12px] text-[#1d1d1f] font-medium shadow-sm">
              {b}
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Banking & Crypto Injections",
    headline: ["250+ overlays.", "Inject. Capture. Extract."],
    body: "HTML, JavaScript, and WebView injections. Browser overlay and accessibility-based injection with real-time form capture. Build custom overlays with the live editor.",
    bg: "#f5f5f7",
    visual: () => (
      <div className="card-light p-5 sm:p-7 w-full">
        <div className="eyebrow text-[#6e6e73] mb-4">Overlay Engine</div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
          {[
            { label: "Banking", count: "120+", color: "#ff3b30" },
            { label: "Crypto", count: "60+", color: "#8b5cf6" },
            { label: "Social", count: "40+", color: "#0ea5e9" },
            { label: "Shopping", count: "30+", color: "#10b981" },
          ].map((cat) => (
            <div key={cat.label} className="card-gray p-3 sm:p-4 flex flex-col gap-1 rounded-xl">
              <div className="text-[11px] text-[#6e6e73]">{cat.label}</div>
              <div className="text-xl sm:text-2xl font-bold" style={{ color: cat.color }}>{cat.count}</div>
            </div>
          ))}
        </div>
        <div className="h-10 rounded-xl flex items-center justify-center text-[13px] font-medium text-[#ff3b30] border border-[#ff3b30]/25 bg-[#ff3b30]/5">
          Custom Overlay Editor
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Stealth",
    headline: ["Invisible.", "Undetectable.", "Always on."],
    body: "Hidden icon, background service, no user alerts. Persistent encrypted connection with auto-reconnect. Anti-kill and anti-delete protection.",
    bg: "#fff",
    visual: () => (
      <div className="card-gray p-5 sm:p-7 w-full">
        <div className="eyebrow text-[#6e6e73] mb-4">Stealth Status</div>
        {[
          { label: "App Icon", status: "Hidden" },
          { label: "User Alerts", status: "Silent" },
          { label: "Recent Apps", status: "Excluded" },
          { label: "Anti-Kill Mode", status: "Active" },
          { label: "Auto-Reconnect", status: "Enabled" },
          { label: "Encrypted Link", status: "AES-256" },
        ].map((s, i, arr) => (
          <div key={s.label}
            className={`flex items-center justify-between py-3 ${i < arr.length - 1 ? "border-b border-black/6" : ""}`}>
            <span className="text-[13px] sm:text-[14px] text-[#1d1d1f]">{s.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-emerald-600 font-medium">{s.status}</span>
              <div className="w-8 h-4 bg-emerald-500 rounded-full flex items-center justify-end px-0.5 shrink-0">
                <div className="w-3 h-3 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Monitoring",
    headline: ["Keylogger.", "Clipboard.", "Every notification."],
    body: "System-wide keylogger captures input from every app. Real-time clipboard monitoring, notification reading, and complete app activity tracking.",
    bg: "#f5f5f7",
    visual: () => (
      <div className="card-light p-5 sm:p-6 w-full">
        <div className="flex items-center justify-between mb-3">
          <span className="eyebrow text-[#6e6e73]">Keylogger Stream</span>
          <span className="text-[10px] text-red-500 font-semibold">● Capturing</span>
        </div>
        <div className="bg-[#1d1d1f] rounded-xl p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] flex flex-col gap-2">
          {[
            { ts: "14:02:11", app: "Gmail", text: "password123", hi: false },
            { ts: "14:02:23", app: "Chrome", text: "BTC addr copied", hi: false },
            { ts: "14:03:01", app: "Auth", text: "OTP: 847291", hi: true },
            { ts: "14:03:44", app: "Bank", text: "card number...", hi: false },
          ].map((l, i) => (
            <div key={i} className={`flex gap-1.5 sm:gap-2 ${l.hi ? "text-[#ff6b6b]" : "text-emerald-400/70"}`}>
              <span className="text-white/25 shrink-0">{l.ts}</span>
              <span className="text-[#ff3b30]/50 shrink-0">[{l.app}]</span>
              <span className="truncate">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

function FeatureShowcase() {
  return (
    <section id="features" className="divider-dark">
      {showcaseFeatures.map((feat, i) => {
        const isEven = i % 2 === 0;
        return (
          <div key={feat.eyebrow} style={{ background: feat.bg }} className="divider-light">
            <div className="max-w-[980px] mx-auto px-5 sm:px-6 py-14 sm:py-20 md:py-28">
              <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 md:gap-16`}>
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1 w-full">
                  <p className="eyebrow eyebrow-red mb-3">{feat.eyebrow}</p>
                  <h2 className="display-md text-[#1d1d1f] mb-5">
                    {feat.headline.map((line, j) => (
                      <span key={j}>
                        {j === 0 ? <span className="gradient-red">{line}</span> : line}
                        {j < feat.headline.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  <p className="body-md text-[#6e6e73] max-w-[380px]">{feat.body}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1 w-full flex justify-center">
                  <div className="w-full max-w-md">{feat.visual()}</div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

// ─────────────────────────────────────────────
// FULL FEATURE GRID
// ─────────────────────────────────────────────
const allCats = [
  { emoji: "🖥️", title: "Remote Control", items: ["Real-time screen viewing","Touch simulation","Screen recording (FFMPEG)","Screenshot capture","Remote reboot / shutdown"] },
  { emoji: "📸", title: "Media Access", items: ["Front & back camera","Remote photo capture","Microphone recording","Live audio streaming","Gallery browsing"] },
  { emoji: "☁️", title: "File Management", items: ["Full file system browsing","Upload / download files","File search & filtering","Delete, rename, move","Directory creation"] },
  { emoji: "💬", title: "Communication", items: ["SMS read & send","Call logs access","Contact extraction","Live chat messaging","Call forwarding & USSD"] },
  { emoji: "📱", title: "App Management", items: ["View all installed apps","Launch / close remotely","Install / uninstall APKs","App usage statistics","Package & permission info"] },
  { emoji: "🈴", title: "Banking / Injections", items: ["HTML / JS injection","Browser overlay injection","WebView injection","Accessibility injection","Real-time input capture"] },
  { emoji: "💸", title: "Device Information", items: ["Full device specs","Battery & network info","GPS location tracking","Storage & SIM details","IMEI & identifiers"] },
  { emoji: "📳", title: "Monitoring", items: ["System-wide keylogger","Clipboard monitoring","Notification reading","App activity tracking"] },
  { emoji: "🗝", title: "Permissions & Access", items: ["Accessibility service","Device admin privileges","Auto-start on boot","Battery optimization bypass","Overlay & notification access"] },
  { emoji: "👻", title: "Stealth", items: ["Hidden app icon","Background service","Encrypted persistent link","Auto-reconnect","Excluded from recents"] },
  { emoji: "🟠", title: "Custom Overlays", items: ["250+ pre-built overlays","Custom overlay maker","Real-time live editor"] },
  { emoji: "😁", title: "Advanced Controls", items: ["Custom notifications","Screen lock / unlock","Flashlight & vibration","Volume & brightness","VPN detection","DDoS capability"] },
  { emoji: "🌐", title: "Networking", items: ["HTTP / HTTPS","WebSocket real-time","Auto reconnection","Multiple servers","Encrypted comms"] },
  { emoji: "🤖", title: "Compatibility", items: ["Android 7.0 → 16+","EN, AR, ZH, RU, TR, PT, ES","All major brands","No root required"] },
  { emoji: "💎", title: "Extra", items: ["Anti Delete / Kill Mode","No port forwarding","Social media monitoring","Play Store integration","FUD crypter included"] },
];

function FullFeatures() {
  return (
    <section className="bg-[#f5f5f7] divider-light py-14 sm:py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow eyebrow-red mb-3">Complete Feature List</p>
          <h2 className="display-md text-[#1d1d1f] mb-3">Everything, listed.</h2>
          <p className="body-md text-[#6e6e73] max-w-sm mx-auto">80+ capabilities across 15 categories.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allCats.map((cat, i) => (
            <motion.div key={cat.title}
              variants={reveal} initial="hidden" whileInView="show" custom={(i % 3) * 0.12}
              viewport={{ once: true, margin: "-40px" }}
              className="card-light p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-lg sm:text-xl">{cat.emoji}</span>
                <h3 className="text-[13px] sm:text-[14px] font-semibold text-[#1d1d1f]">{cat.title}</h3>
              </div>
              <ul className="flex flex-col gap-1.5 sm:gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[12px] text-[#6e6e73]">
                    <Check className="w-3 h-3 text-[#ff3b30] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const inc = to / 60;
    const t = setInterval(() => { s += inc; if (s >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(s)); }, 22);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function Stats() {
  const stats = [
    { to: 10, suffix: "K+", label: "Active Users" },
    { to: 10, suffix: "+", label: "Android Versions" },
    { to: 250, suffix: "+", label: "Overlays Included" },
    { to: 80, suffix: "+", label: "Feature Modules" },
  ];
  return (
    <section className="bg-[#1d1d1f] divider-dark py-14 sm:py-20">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              variants={reveal} initial="hidden" whileInView="show" custom={i * 0.15}
              viewport={{ once: true }}
              className="bg-[#1d1d1f] px-5 sm:px-8 py-8 sm:py-10 text-center">
              <div className="display-sm sm:display-md text-white mb-2 tabular-nums">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-[12px] sm:text-[13px] text-[#6e6e73]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// WORKFLOW
// ─────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Get Your License",
    desc: "Purchase via Telegram. Receive panel credentials instantly. Setup in under two minutes.",
    visual: () => (
      <div className="card-gray p-4 sm:p-5 w-full">
        <div className="eyebrow text-[#6e6e73] mb-3">Activation</div>
        {[{ k: "License Key", v: "CR4T-XXXX-XXXX" }, { k: "Plan", v: "Monthly" }, { k: "Status", v: "ACTIVE ✓" }].map((r, i) => (
          <div key={r.k} className={`flex justify-between py-2.5 ${i < 2 ? "border-b border-black/6" : ""}`}>
            <span className="text-[12px] text-[#6e6e73]">{r.k}</span>
            <span className={`text-[12px] font-medium ${r.k === "Status" ? "text-emerald-600" : "text-[#1d1d1f]"}`}>{r.v}</span>
          </div>
        ))}
        <div className="mt-4 h-10 rounded-xl bg-[#ff3b30]/8 border border-[#ff3b30]/20 flex items-center justify-center text-[13px] text-[#ff3b30] font-medium">
          Activate Panel
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Deploy the APK",
    desc: "Generate a custom FUD APK. No port forwarding needed. Works on all Android brands.",
    visual: () => (
      <div className="card-gray p-4 sm:p-5 w-full">
        <div className="eyebrow text-[#6e6e73] mb-3">Building APK</div>
        <div className="bg-[#1d1d1f] rounded-xl p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] flex flex-col gap-2">
          {[["Injecting payload...", false], ["Signing APK...", false], ["FUD Crypter...", false], ["APK READY", true]].map(([t, hi], i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.25 }} viewport={{ once: true }}
              className={hi ? "text-[#ff6b6b] font-bold" : "text-emerald-400/80"}>
              {`> ${t}${!hi ? " [OK]" : ""}`}
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Take Full Control",
    desc: "Device appears instantly. Access screen, SMS, camera, overlays, GPS — everything.",
    visual: () => (
      <div className="card-gray p-4 sm:p-5 w-full">
        <div className="flex justify-between items-center mb-3">
          <span className="eyebrow text-[#6e6e73]">Device Online</span>
          <span className="text-[10px] text-emerald-600 font-semibold animate-pulse">● Connected</span>
        </div>
        <div className="card-light p-3 mb-3 flex items-center gap-2.5 rounded-xl border border-black/6">
          <div className="w-8 h-8 rounded-lg bg-[#ff3b30]/10 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-[#ff3b30]" />
          </div>
          <div>
            <div className="text-[12px] text-[#1d1d1f] font-medium">Samsung Galaxy S24</div>
            <div className="text-[10px] text-[#6e6e73]">Android 14 · Online</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {["Screen","Files","SMS","Camera","GPS","Overlays"].map((b) => (
            <div key={b} className="h-7 rounded-lg bg-[#ff3b30]/8 border border-[#ff3b30]/15 flex items-center justify-center text-[10px] text-[#ff3b30] font-medium">{b}</div>
          ))}
        </div>
      </div>
    ),
  },
];

function Workflow() {
  return (
    <section id="workflow" className="bg-[#fff] divider-light py-14 sm:py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow eyebrow-red mb-3">How It Works</p>
          <h2 className="display-md text-[#1d1d1f] mb-3">Up in three steps.</h2>
          <p className="body-md text-[#6e6e73] max-w-xs mx-auto">From purchase to full control in minutes.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <motion.div key={s.num}
              variants={reveal} initial="hidden" whileInView="show" custom={i * 0.2}
              viewport={{ once: true, margin: "-60px" }}
              className="card-light flex flex-col overflow-hidden">
              <div className="p-4 sm:p-5 bg-[#f5f5f7] border-b border-black/6">{s.visual()}</div>
              <div className="p-5 sm:p-6">
                <div className="text-[#ff3b30] text-[13px] font-semibold mb-1.5">{s.num}</div>
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#1d1d1f] mb-2">{s.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-[#6e6e73] leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SOCIAL PROOF
// ─────────────────────────────────────────────
const testimonials = [
  { handle: "@phantom_user", role: "Security Researcher", text: "The overlay injection system is second to none. 250+ templates and a live editor. Nothing comes close.", stars: 5 },
  { handle: "@r00t_access", role: "Penetration Tester", text: "The only Android RAT that consistently bypasses modern detection. Stealth mode is rock solid.", stars: 5 },
  { handle: "@null_pointer_", role: "Red Team Operator", text: "Screen, keylogger, GPS, SMS — everything just works. The panel is clean and fast.", stars: 5 },
  { handle: "@v01d_w4lker", role: "Independent Researcher", text: "No port forwarding, FUD crypter included, works on Android 16. Support is incredibly fast.", stars: 5 },
  { handle: "@xpl0it_dev", role: "Security Analyst", text: "Anti-kill kept my sessions alive under aggressive device management. Exceptional reliability.", stars: 5 },
  { handle: "@byte_wr1ter", role: "Bug Bounty Hunter", text: "Lifetime plan was the best investment. From targeting to exfil, CELLIK handles everything.", stars: 5 },
];

function SocialProof() {
  return (
    <section className="bg-[#f5f5f7] divider-light py-14 sm:py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow eyebrow-red mb-3">Reviews</p>
          <h2 className="display-md text-[#1d1d1f] mb-3">Loved by operators.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.handle}
              variants={reveal} initial="hidden" whileInView="show" custom={(i % 3) * 0.12}
              viewport={{ once: true, margin: "-50px" }}
              className="card-light p-5 sm:p-6 flex flex-col gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 star fill-current" />
                ))}
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#6e6e73] leading-relaxed flex-1">"{t.text}"</p>
              <div>
                <div className="text-[13px] font-semibold text-[#1d1d1f]">{t.handle}</div>
                <div className="text-[11px] text-[#6e6e73] mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PRICING
// ─────────────────────────────────────────────
const plans = [
  {
    name: "Monthly",
    price: "$250", period: "/mo",
    desc: "Full access. All 80+ features.",
    tag: null, popular: false, cta: "Get Monthly",
    features: ["All 80+ feature modules","250+ banking overlays","Custom overlay editor","FUD Crypter included","No port forwarding","Telegram support"],
  },
  {
    name: "Monthly + RDP",
    price: "$300", period: "/mo",
    desc: "All features plus a dedicated RDP server.",
    tag: "Most Popular", popular: true, cta: "Get Monthly + RDP",
    features: ["Everything in Monthly","Dedicated RDP server","Priority support","Faster APK builds","Dedicated server IP"],
  },
  {
    name: "Lifetime",
    price: "$1,200", period: "one-time",
    desc: "Pay once. Own forever.",
    tag: null, popular: false, cta: "Get Lifetime",
    features: ["Everything in Monthly + RDP","Lifetime access","All future updates","Lifetime RDP server","VIP support","Custom features"],
  },
];

function Pricing() {
  return (
    <section id="pricing" className="bg-[#000] divider-dark py-14 sm:py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow eyebrow-red mb-3">Pricing</p>
          <h2 className="display-md text-white mb-3">Simple pricing.</h2>
          <p className="body-md text-[#6e6e73] max-w-xs mx-auto">All plans include every feature. Contact on Telegram to purchase.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[860px] mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              variants={reveal} initial="hidden" whileInView="show" custom={i * 0.15}
              viewport={{ once: true }}
              className={`rounded-[18px] p-6 sm:p-8 flex flex-col gap-4 sm:gap-5 relative ${plan.popular ? "pricing-popular" : "card-dark"}`}>
              {plan.tag && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff3b30] text-white text-[11px] font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  {plan.tag}
                </div>
              )}
              <div>
                <div className="text-[16px] sm:text-[17px] font-semibold text-white mb-1">{plan.name}</div>
                <div className="text-[12px] sm:text-[13px] text-[#6e6e73]">{plan.desc}</div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[36px] sm:text-[40px] font-bold text-white tracking-tight leading-none">{plan.price}</span>
                <span className="text-[#6e6e73] text-[13px]">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-[#a1a1a6]">
                    <Check className="w-3.5 h-3.5 text-[#ff3b30] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer"
                className={`block text-center py-3 rounded-xl text-[14px] sm:text-[15px] font-medium transition-all ${plan.popular ? "btn-red" : "btn-white-outline"}`}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[#6e6e73] text-[12px] sm:text-[13px] mt-7">
          Questions?{" "}
          <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="text-[#ff3b30] hover:underline">
            Contact @CELLIKBACKUP on Telegram
          </a>
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#000] divider-dark">
      <div className="divider-dark py-16 sm:py-24 text-center">
        <div className="max-w-[540px] mx-auto px-5 sm:px-6 flex flex-col items-center">
          <img src={LOGO} alt="" className="h-16 sm:h-20 w-auto object-contain mb-6 opacity-90"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,59,48,0.35))" }} />
          <h2 className="display-md text-white mb-4">
            Ready to take <span className="gradient-red-dark">full control?</span>
          </h2>
          <p className="body-md text-[#6e6e73] mb-8 max-w-sm">
            Join thousands of operators worldwide. Get started today via Telegram.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer"
              className="btn-red justify-center">
              Contact on Telegram <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#pricing" className="btn-white-outline justify-center">View Pricing</a>
          </div>
        </div>
      </div>

      <div className="divider-dark max-w-[980px] mx-auto px-5 sm:px-6 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <img src={LOGO} alt="" className="h-5 w-auto opacity-60" />
            <span className="text-[13px] font-semibold text-[#f5f5f7]">
              CELLIK<span className="text-[#ff3b30]">R4T</span>
            </span>
          </div>
          <div className="flex gap-6">
            {["Features","Pricing","Support"].map((l) => (
              <a key={l} href={l === "Support" ? SUPPORT_URL : `#${l.toLowerCase()}`}
                target={l === "Support" ? "_blank" : undefined}
                className="text-[12px] sm:text-[13px] text-[#6e6e73] hover:text-[#a1a1a6] transition-colors">{l}</a>
            ))}
          </div>
          <span className="text-[11px] sm:text-[12px] text-[#6e6e73]">© {new Date().getFullYear()} CELLIK Systems</span>
        </div>
      </div>

      <div className="overflow-hidden text-center select-none pointer-events-none">
        <div className="brand-huge">CELLIK R4T</div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// SUPPORT BUTTON
// ─────────────────────────────────────────────
function SupportButton() {
  return (
    <motion.a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer"
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
      className="fixed bottom-5 right-5 z-50 group flex items-center justify-center w-13 h-13 rounded-full bg-[#0088cc] shadow-[0_4px_20px_rgba(0,136,204,0.4)] transition-all"
      style={{ width: 52, height: 52 }}>
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1d1d1f] border border-white/10 text-white text-[12px] font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl">
        Customer Support
      </span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden" style={{ background: "#000" }}>
      <Navbar />
      <Hero />
      <FeatureShowcase />
      <FullFeatures />
      <Stats />
      <Workflow />
      <SocialProof />
      <Pricing />
      <Footer />
      <SupportButton />
    </div>
  );
}
