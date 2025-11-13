import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Atom } from "react-loading-indicators";

const API_BASE = "https://krishilink-server-one.vercel.app";

const MyInterest = () => {
  const { user, loading } = useContext(AuthContext);
  const [mydata, setMydata] = useState([]);
  const [cropsMap, setCropsMap] = useState({});
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;
    setLoadingData(true);

    // Parallel fetch: interests + all crops
    const p1 = axios.get(`${API_BASE}/myinterest`, { params: { email: user.email } });
    const p2 = axios.get(`${API_BASE}/allcrops`);

    Promise.all([p1, p2])
      .then(([intRes, cropsRes]) => {
        if (cancelled) return;

        const interests = Array.isArray(intRes.data) ? intRes.data : [];
        const crops = Array.isArray(cropsRes.data) ? cropsRes.data : [];

        // build map: cropId -> crop doc
        const map = {};
        for (const c of crops) {
          if (c && c._id) map[String(c._id)] = c;
        }
        setCropsMap(map);

        // merge cropName/owner into interest items for display (non-destructive)
        const merged = interests.map((it) => {
          const crop = map[String(it.cropId)];
          return {
            ...it,
            cropName: it.cropName || (crop ? crop.name : ""),
            ownerName: it.ownerName || (crop ? crop.owner?.ownerName : "") || it.ownerEmail,
            unit: it.unit || (crop ? crop.unit : ""),
          };
        });

        setMydata(merged);
      })
      .catch((err) => {
        console.error("Failed to load interests or crops:", err);
        setMydata([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingData(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Atom color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  return (
    <div className="mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          My Interests <span className="text-emerald-600">({mydata.length})</span>
        </h1>
        {loadingData && <div className="text-sm text-slate-500">Refreshing…</div>}
      </div>

      <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-slate-900">Interest List</h2>
        </div>

        {mydata.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No interests found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 z-10">
                <tr className="text-left text-[12px] uppercase tracking-wide text-slate-600 bg-slate-50">
                  <th className="py-3 px-4">Crop Name</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>

              <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-slate-50/50">
                {mydata.map((item) => (
                  <tr key={item._id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{item.cropName || item.cropId || "—"}</div>
                      <div className="text-xs text-slate-500">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-slate-800">{item.ownerName || item.ownerEmail || "—"}</div>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-900">{item.quantity}</span>
                      {item.unit ? <span className="text-slate-500"> {item.unit}</span> : null}
                    </td>

                    <td className="py-3 px-4 max-w-[450px]">
                      <p className="text-slate-700 line-clamp-2">{item.message || "—"}</p>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={[
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border capitalize",
                          item.status === "accepted"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "w-1.5 h-1.5 rounded-full",
                            item.status === "accepted"
                              ? "bg-emerald-600"
                              : item.status === "rejected"
                              ? "bg-rose-600"
                              : "bg-amber-600",
                          ].join(" ")}
                        />
                        {item.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="h-1 w-full bg-slate-50" />
      </div>
    </div>
  );
};

export default MyInterest;
