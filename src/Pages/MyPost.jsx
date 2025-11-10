import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios.get("http://localhost:9000/myposts", {
      params: { email: user.email }
    })
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Posts</h1>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        {/* Responsive Table */}
        <table className="table min-w-[600px] w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="py-3">Crop</th>
              <th className="py-3">Price</th>
              <th className="py-3">quantity</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="py-10 text-center text-slate-500">
                  No posts yet.
                </td>
              </tr>
            )}

            {rows.map((item) => (
              <tr key={item._id} className="hover border-b">
                {/* CROP */}
                <td className="py-3 font-medium">{item.name}</td>

                {/* PRICE */}
                <td className="py-3">
                  ৳ {item.pricePerUnit}
                  <span className="text-slate-400"> / {item.unit}</span>
                </td>

                {/* QTY → GREEN BADGE */}
                <td className="py-3">
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {item.quantity}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="py-3">
                  <div className="flex justify-end gap-2">
                    <button className="btn btn-xs">Edit</button>
                    <button className="btn btn-xs btn-error text-white">Delete</button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MyPost;
