import React, { use, useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { Atom } from "react-loading-indicators";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext";

const API_BASE = "http://localhost:9000";

const MyPost = () => {
  const { user, loading } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const cropRef = useRef();


  // Load my posts
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${API_BASE}/myposts`, { params: { email: user.email } })
      .then((res) => setRows(res.data || []))
      .catch((err) => console.log(err));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Atom color="#32cd32" size="medium" text="" textColor="" />
      </div>
    );
  }

  // Open Edit Modal
  const editbtn = (item) => {
    setSelected(item);
    if (cropRef.current && typeof cropRef.current.showModal === "function") {
      cropRef.current.showModal();
    }
  };

  // Update Crop
  const updatedcrop = (e) => {
    e.preventDefault();
    if (!selected) return;

    const updateinfo = {
      name: e.target.name.value,
      pricePerUnit: e.target.pricePerUnit.value,
      quantity: e.target.quantity.value,
    };

    axios
      .put(`${API_BASE}/myposts/${selected._id}`, updateinfo)
      .then(() => {
        setRows((prev) =>
          prev.map((r) =>
            r._id === selected._id ? { ...r, ...updateinfo } : r
          )
        );

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your crop has been updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        if (cropRef.current) cropRef.current.close();
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire("Error", "Failed to update crop.", "error");
      });
  };

  // Delete Crop (SweetAlert2)
  const postdeleted = async (item) => {
    const { isConfirmed } = await Swal.fire({
      title: `Delete "${item.name}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it",
    });

    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/myposts/${item._id}`);

      setRows((prev) => prev.filter((r) => r._id !== item._id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your post has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Delete failed:", err);
      Swal.fire("Error", "Failed to delete post. Try again.", "error");
    }
  };

 

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Posts</h1>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="table min-w-[600px] w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="py-3">Crop</th>
              <th className="py-3">Price</th>
              <th className="py-3">Quantity</th>
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
                <td className="py-3 font-medium text-black">{item.name}</td>

                <td className="py-3 text-black">
                  ৳ {item.pricePerUnit}
                  <span className="text-slate-400"> / {item.unit}</span>
                </td>

                <td className="py-3 text-black">
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold">
                    {item.quantity}
                  </span>
                </td>

                <td className="py-3 text-black">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => editbtn(item)}
                      className="btn btn-xs"
                    >
                      Edit
                    </button>

                    {/* Edit Modal */}
                    <dialog
                      ref={cropRef}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <form onSubmit={updatedcrop} className="space-y-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Crop Name
                              </span>
                            </label>
                            <input
                              defaultValue={selected?.name}
                              type="text"
                              name="name"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Price (৳)
                              </span>
                            </label>
                            <input
                              defaultValue={selected?.pricePerUnit}
                              type="number"
                              name="pricePerUnit"
                              min="0"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Quantity
                              </span>
                            </label>
                            <input
                              defaultValue={selected?.quantity}
                              type="number"
                              name="quantity"
                              min="0"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          <div className="pt-2 flex justify-end">
                            <button
                              type="submit"
                              className="btn bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              Update Crop
                            </button>
                          </div>
                        </form>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button
                      onClick={() => postdeleted(item)}
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </button>
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
