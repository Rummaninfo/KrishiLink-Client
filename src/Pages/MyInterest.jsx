import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const [mydata, setMydata] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:9000/myinterest?email=${user.email}`)
        .then((res) => setMydata(res.data || []))
        .catch(console.error);
    }
  }, [user]);

  return (
    <div className="mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        My Interests <span className="text-emerald-600">({mydata.length})</span>
      </h1>

      {/* ===== UNIQUE TABLE DESIGN ===== */}
      <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
        {/* top gradient strip */}
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
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>

              <tbody className="[&>tr:nth-child(odd)]:bg-white [&>tr:nth-child(even)]:bg-slate-50/50">
                {mydata.map((item) => (
                  <tr key={item._id} className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        
                        <div>
                          <div className="font-medium text-slate-900 leading-5">
                            {item.userName || item.userName || "—"}
                          </div>
                          
                        </div>
                      </div>
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
                        {item.status}
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
