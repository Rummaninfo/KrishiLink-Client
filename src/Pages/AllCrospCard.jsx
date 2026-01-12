
import React from "react";
import { Link } from "react-router";

const AllCrospCard = ({ prev }) => {

  console.log(prev)
  return (
    <article
      className="group relative w-full  overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
      aria-labelledby={`crop-${prev?._id}`}
    >
      {/* Top media */}
      <div className="relative">
        <img
          src={prev?.image}
          alt={`${prev?.name} from ${prev?.location}`}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> {prev?.type}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
          {prev?.location}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        <h3
          id={`crop-${prev?._id}`}
          className="line-clamp-1 text-lg font-semibold text-slate-900 dark:text-white"
        >
          {prev?.name}
        </h3>

        {/* Price & qty */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-white ">
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

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 ">
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
          <span className="mx-1 dark:text-slate-400">•</span>
          <a
            href={`mailto:${prev?.owner?.ownerEmail}`}
            className="underline-offset-2 hover:underline dark:text-slate-400"
          >
            {prev?.owner?.ownerEmail}
          </a>
        </div>

        {/* Actions */}
        <div className="mt-2 flex items-center gap-2">
          <Link
            to={`/crops-details/${prev._id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-orange-500"
          >
            View Details
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Save"
            title="Save"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition group-hover:ring-emerald-200" />
    </article>
  );
};

export default AllCrospCard;
