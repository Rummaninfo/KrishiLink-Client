// Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, Link } from "react-router";
import { motion } from "framer-motion";

/* ---------------- Hero Slider ---------------- */
const HeroSlider = ({ slides = [], interval = 6000 }) => {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [slides, interval]);

  const prev = () => {
    clearInterval(timerRef.current);
    setIdx((i) => (i - 1 + slides.length) % slides.length);
  };
  const next = () => {
    clearInterval(timerRef.current);
    setIdx((i) => (i + 1) % slides.length);
  };

  return (
    <div className="relative w-full  rounded-2xl dark:bg-amber-300">
      <div className="relative h-[420px] md:h-[520px]">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === idx
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute left-6 bottom-8 max-w-xl text-white">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                {s.title}
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/90">
                {s.subtitle}
              </p>
              {s.cta && (
                <Link
                  to={s.cta.href}
                  className="inline-block mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold shadow hover:bg-emerald-700"
                >
                  {s.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        ◀
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        ▶
      </button>

      {/* indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearInterval(timerRef.current);
              setIdx(i);
            }}
            className={`h-2 w-8 rounded-full transition ${
              i === idx ? "bg-emerald-600" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

/* ---------------- How It Works Section ---------------- */
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 160, damping: 20 },
  },
};

const HowItWorks = ({ className = "" }) => {
  const steps = [
    {
      title: "Browse Crops",
      desc: "Explore available fresh crops from local sellers.",
    },
    {
      title: "View Details",
      desc: "See price, quantity and seller information on each product page.",
    },
    {
      title: "Submit Interest",
      desc: "Buyers send interest with quantity & a message — status: pending.",
    },
    {
      title: "Seller Response",
      desc: "Seller accepts or rejects the interest request.",
    },
    {
      title: "Complete Deal",
      desc: "After acceptance, parties coordinate payment & delivery offline.",
    },
  ];

  return (
    <section
      className={`mt-12 p-6 bg-white rounded-2xl shadow-sm ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold text-center text-emerald-700 dark:text-white">
          How it works
        </h3>
        <p className="text-sm text-center text-slate-500  mt-2">
          Simple steps to buy or sell fresh crops.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {steps.map((s, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative p-5 rounded-xl bg-slate-50 shadow-sm overflow-hidden   group"
            >
              {/* Animated border draw */}
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-linear"></span>
              <span className="absolute right-0 top-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-300 ease-linear delay-150"></span>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-linear delay-300"></span>
              <span className="absolute left-0 bottom-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-300 ease-linear delay-[450ms]"></span>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-emerald-600  text-white font-semibold mb-3">
                  {i + 1}
                </div>
                <div className="font-semibold text-slate-800">{s.title}</div>
                <div className="text-xs text-slate-600 mt-1 leading-snug">
                  {s.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ---------------- Agro News Section ---------------- */
const AgroNews = () => {
  const posts = [
    {
      id: 1,
      title: "Women taking power in agriculture",
      date: "12th May 2022",
      image: "https://i.ibb.co.com/G3rNB5kM/femalte-farmer.jpg",
    },
    {
      id: 2,
      title: "Contract Farming Gets a Boost",
      date: "12th Jan 2023",
      image: "https://i.ibb.co.com/npt1L1V/farmer-2.webp",
    },
    {
      id: 3,
      title: "Innovation From Soil to Software",
      date: "15th Apr 2023",
      image: "https://i.ibb.co.com/6719MvJ6/farmer-3.jpg",
    },
    {
      id: 4,
      title: "If You Ate Today, Thank a Farmer!",
      date: "1st Apr 2024",
      image:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="mt-16 bg-[#fef6e2] dark:bg-gray-900  py-12">
      <div className="max-w-6xl mx-auto px-4 text-center ">
        <h2 className="text-3xl md:text-4xl font-semibold text-emerald-600 dark:text-white ">
          Harvesting Insights
        </h2>
        <p className="text-slate-600 mt-2 dark:text-white">
          Explore our latest thinking on sustainable farming
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts?.map((p) => (
            <article key={p.id} className="text-left">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-44 object-cover rounded-xl shadow-sm"
              />
              <h3 className="mt-4 text-base md:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                {p.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 dark:text-white">{p.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- NEW: HarvestingInsights Hero Section (empty image src) ---------------- */
const HarvestingInsights = () => {
  return (
    <section className="relative w-full h-[420px] lg:h-[520px] overflow-hidden mt-12">
      {/* IMAGE AREA (leave src empty so you can add your own later) */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/zWH2Fx4L/banner.jpg" // add your image URL or import here when ready
          alt="Harvesting background (add your image here)"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Content box placed left like the screenshot */}
      <div className="relative z-10 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="ml-6 md:ml-16 lg:ml-28 bg-black/65 text-white p-6 md:p-8 lg:p-10 rounded-md max-w-2xl shadow-lg"
        >
          <p className="text-sm text-amber-300 uppercase mb-2">Stay updated</p>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Our latest news, updates & offers delivered directly to your inbox
          </h1>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Sign up for updates
          </motion.button>
        </motion.div>
      </div>

      {/* subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300/40" />
    </section>
  );
};

/* ---------------- Home Component ---------------- */
const Home = () => {
  const loaderData = useLoaderData();
  const data = Array.isArray(loaderData) ? loaderData : loaderData?.data || [];

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1600&auto=format&fit=crop",
      title: "Fresh from Local Farmers",
      subtitle: "Buy high-quality crops directly from trusted local growers.",
      cta: { href: "/all-crops", label: "Browse All Crops" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1600&auto=format&fit=crop",
      title: "Organic & Seasonal",
      subtitle: "Seasonal picks hand-picked and delivered fresh.",
      cta: { href: "/how-it-works", label: "Learn More" },
    },
    {
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      title: "Trusted Sellers",
      subtitle: "Connect with verified sellers & negotiate terms.",
      cta: { href: "/seller-dashboard", label: "For Sellers" },
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-6">
        <HeroSlider slides={heroSlides} interval={6000} />
      </div>
      {/* Latest Crops */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-white">
            Available Fresh Crops
          </h2>
          <Link
            to="/all-crops"
            className="text-sm rounded-md bg-white border px-3 py-2 text-emerald-600 hover:bg-emerald-50"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {data?.slice(0, 6).map((prev) => (
            <motion.article
              key={prev?._id}
              whileHover={{ scale: 1.02, y: -6 }}
              className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 dark:bg-gray-900"
              aria-labelledby={`crop-${prev?._id}`}
            >
              {/* Animated Border */}
              <span className="absolute left-0 top-0 h-[2px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-linear" />
              <span className="absolute right-0 top-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-300 ease-linear delay-150" />
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-emerald-500 group-hover:w-full transition-all duration-300 ease-linear delay-300" />
              <span className="absolute left-0 bottom-0 w-[2px] h-0 bg-emerald-500 group-hover:h-full transition-all duration-300 ease-linear delay-[450ms]" />

              <div className="relative">
                <img
                  src={prev?.image}
                  alt={`${prev?.name} from ${prev?.location}`}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                  {prev?.type}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                  {prev?.location}
                </span>
              </div>

              <div className="flex flex-col gap-3 p-4">
                <h3
                  id={`crop-${prev?._id}`}
                  className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white"
                >
                  {prev?.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-white">
                    ৳{prev?.pricePerUnit}
                    <span className="ml-1 align-top text-sm font-medium text-slate-500">
                      /{prev?.unit}
                    </span>
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Qty: {Intl.NumberFormat().format(prev?.quantity ?? 0)}
                  </div>
                </div>

                <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {prev?.description}
                </p>

                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="dark:text-slate-400">{prev?.owner?.ownerName}</span>
                  <span className="mx-1 dark:text-slate-400 ">•</span>
                  <a
                    href={`mailto:${prev?.owner?.ownerEmail}`}
                    className="underline-offset-2 hover:underline dark:text-slate-400"
                  >
                    {prev?.owner?.ownerEmail}
                  </a>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Link
                    to={`/crops-details/${prev?._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
      {/* main  */}
      {/* How it works */}
      <div className="container mx-auto px-4">
        <HowItWorks className="mt-12 dark:bg-gray-900 " />
      </div>
      {/* Agro News Section */}
      <AgroNews />
      {/* NEW: Harvesting Insights hero (screen-shot style). Image src intentionally left empty. */}
      <HarvestingInsights />
      <div className="h-24" /> {/* spacing bottom */}
    </>
  );
};

export default Home;
