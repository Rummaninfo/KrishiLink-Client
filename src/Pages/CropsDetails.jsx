// CropsDetails.jsx
import axios from "axios";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const API_BASE = "https://krishilink-server-one.vercel.app";

const CropsDetails = () => {
  const crop = useLoaderData();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // ----- Form state -----
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [updatingRequestId, setUpdatingRequestId] = useState(null);
  const modalRef = useRef(null);
  const params = useParams();

  const [myInterest, setMyInterest] = useState([]);
  const [alreadyInterested, setAlreadyInterested] = useState(false);
  const [loadingMyInterest, setLoadingMyInterest] = useState(false);

  // Local copy of crop quantity so UI updates instantly when owner accepts
  const [localQuantity, setLocalQuantity] = useState(crop?.quantity ?? 0);
  useEffect(() => {
    setLocalQuantity(crop?.quantity ?? 0);
  }, [crop?.quantity]);

  const pricePerUnit = Number(crop?.pricePerUnit ?? 0);
  const total = useMemo(() => {
    const q = Number(quantity) || 0;
    return q * pricePerUnit;
  }, [quantity, pricePerUnit]);

  // Fetch user's interests (all) and decide if any interest belongs to this crop
  useEffect(() => {
    if (!user?.email) return;
    if (!crop?._id) return;

    let cancelled = false;
    setLoadingMyInterest(true);

    axios
      .get(`${API_BASE}/myinterest`, {
        params: { email: user.email },
      })
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res.data) ? res.data : [];
        setMyInterest(list);

        const existsForThisCrop = list.some((it) => {
          return String(it.cropId) === String(crop._id);
        });
        setAlreadyInterested(existsForThisCrop);
      })
      .catch((err) => {
        console.error("Error fetching my interests:", err);
      })
      .finally(() => {
        if (!cancelled) setLoadingMyInterest(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.email, crop?._id]);

  // Fetch requests for this crop (used by owner)
  useEffect(() => {
    if (!params?.id) return;
    let cancelled = false;
    setRequestsLoading(true);
    axios
      .get(`${API_BASE}/requestproducts/${params.id}`)
      .then((res) => {
        if (cancelled) return;
        setRequests(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
        setRequests([]);
      })
      .finally(() => {
        if (!cancelled) setRequestsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (!quantity || Number(quantity) < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    
    // Check if requested quantity is available
    if (Number(quantity) > localQuantity) {
      setError(`Only ${localQuantity} ${crop.unit} available.`);
      return;
    }
    
    setError("");
    setPostError("");
    if (modalRef.current && typeof modalRef.current.showModal === "function") {
      modalRef.current.showModal();
    }
  };

  const handleConfirm = async () => {
    setPosting(true);
    setPostError("");
    const interest = {
      cropId: String(crop._id),
      userEmail: user?.email,
      userName: user?.displayName,
      quantity: Number(quantity),
      message,
      status: "pending",
    };

    try {
      const postRes = await axios.post(`${API_BASE}/myinterest`, interest);
      console.log("POST response:", postRes.data);
      setAlreadyInterested(true);
      if (modalRef.current) modalRef.current.close();
      setQuantity(1);
      setMessage("");
      
      if (postRes.data?.message) {
        alert(postRes.data.message);
      } else {
        alert("Interest submitted successfully.");
      }
    } catch (err) {
      console.error("Failed to submit interest:", err);
      if (
        err.response?.status === 400 &&
        err.response?.data?.message?.toLowerCase().includes("exist")
      ) {
        setAlreadyInterested(true);
        alert("You have already shown interest in this crop.");
      } else if (err.response?.data?.message) {
        setPostError(err.response.data.message);
      } else {
        setPostError("Failed to submit interest. Please try again.");
      }
    } finally {
      setPosting(false);
    }
  };

  // ✅ FIXED: Owner actions: accept/reject using PUT method only
  const handleUpdateRequestStatus = async (requestId, newStatus) => {
    if (!requestId) return;
    const ok = window.confirm(
      `Are you sure you want to mark this request as "${newStatus}"?`
    );
    if (!ok) return;

    setUpdatingRequestId(requestId);
    const prevRequests = [...requests];

    try {
      // ✅ USE PUT METHOD INSTEAD OF PATCH
      const res = await axios.put(`${API_BASE}/myinterest`, {
        interestId: requestId,
        cropsId: crop._id, // ✅ ADD cropsId which is required by server
        status: newStatus
      });

      const updatedInterest = res.data?.interest;
      const updatedCrop = res.data?.crop;

      // Update requests list
      setRequests((prev) =>
        prev.map((r) =>
          String(r._id) === String(requestId)
            ? {
                ...r,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : r
        )
      );

      // Update local quantity
      if (updatedCrop && String(updatedCrop._id) === String(crop._id)) {
        setLocalQuantity(updatedCrop.quantity);
      } else if (newStatus === "accepted") {
        // fallback optimistic decrement
        const req = requests.find((x) => String(x._id) === String(requestId));
        if (req) {
          const q = Number(req.quantity) || 0;
          setLocalQuantity((prev) => Math.max(0, prev - q));
        }
      }

      // Show success message
      if (res.data?.message) {
        alert(res.data.message);
      } else {
        alert(`Request ${newStatus} successfully!`);
      }

    } catch (err) {
      console.error("Failed to update request status:", err);
      
      // Better error handling
      if (err.response?.status === 400) {
        alert(
          err.response.data?.message ||
            "Bad request (maybe insufficient quantity)."
        );
      } else if (err.response?.status === 404) {
        alert("Server endpoint not found. Please check server connection.");
      } else if (err.response?.status === 409) {
        alert("This interest was already processed by someone else.");
      } else if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to update status. Try again.");
      }
      setRequests(prevRequests);
    } finally {
      setUpdatingRequestId(null);
    }
  };

  if (loadingMyInterest || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isOwner = user?.email === crop?.owner?.ownerEmail;

  return (
    <>
      <div className="mx-auto p-6">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="btn btn-outline mb-6">
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image + Details */}
          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="rounded-2xl overflow-hidden border shadow-sm">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">
                  {crop.name}
                </h1>

                <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 text-sm rounded-full">
                  {crop.type}
                </span>

                <p className="text-slate-600 leading-relaxed">
                  {crop.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Price</p>
                    <p className="text-lg font-semibold text-emerald-600">
                      ৳{crop.pricePerUnit}{" "}
                      <span className="text-sm text-slate-500">
                        /{crop.unit}
                      </span>
                    </p>
                  </div>

                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Available Quantity</p>
                    <p className="text-lg font-semibold">
                      {localQuantity} {crop.unit}
                    </p>
                  </div>

                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Location</p>
                    <p className="text-base font-medium">{crop.location}</p>
                  </div>

                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Seller</p>
                    <p className="text-base font-medium">
                      {crop.owner?.ownerName}
                      <span className="text-slate-500">
                        {" "}
                        ({crop.owner?.ownerEmail})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* If owner: show Received Interests HERE (below details) */}
            {isOwner && (
              <div className="mt-6">
                <div className="rounded-2xl border shadow-sm p-5 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        Received Interests
                      </h2>
                      <p className="text-xs text-slate-500">
                        All interest requests for this crop.
                      </p>
                    </div>
                    <span className="text-sm text-slate-500">
                      {requests.length} request(s)
                    </span>
                  </div>

                  {requestsLoading ? (
                    <div className="text-center py-4">
                      <div className="loading loading-spinner"></div>
                      <p className="text-slate-500 mt-2">Loading requests...</p>
                    </div>
                  ) : requests.length === 0 ? (
                    <div className="p-4 border rounded-lg bg-slate-50 text-sm text-slate-600 text-center">
                      No interest requests yet for this crop.
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                      <table className="w-full text-sm table-auto">
                        <thead>
                          <tr className="text-left bg-slate-50">
                            <th className="py-2 px-2">Buyer</th>
                            <th className="py-2 px-2">Quantity</th>
                            <th className="py-2 px-2">Message</th>
                            <th className="py-2 px-2">Status</th>
                            <th className="py-2 px-2">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {requests.map((r) => (
                            <tr key={r._id} className="align-top border-t">
                              <td className="py-2 px-2">
                                <div className="font-medium">
                                  {r.userName || r.userEmail || "Unknown"}
                                </div>
                                <div className="text-xs text-slate-500">
                                  {r.userEmail}
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                {r.quantity} {crop.unit}
                              </td>
                              <td className="py-2 px-2">
                                <div className="max-w-[220px] truncate">
                                  {r.message || "-"}
                                </div>
                              </td>
                              <td className="py-2 px-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    r.status === "pending"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : r.status === "accepted"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-red-50 text-red-700"
                                  }`}
                                >
                                  {r.status || "pending"}
                                </span>
                              </td>
                              <td className="py-2 px-2">
                                <div className="flex gap-2">
                                  {r.status === "pending" ? (
                                    <>
                                      <button
                                        className="btn btn-success btn-sm text-xs"
                                        onClick={() =>
                                          handleUpdateRequestStatus(
                                            r._id,
                                            "accepted"
                                          )
                                        }
                                        disabled={updatingRequestId === r._id}
                                      >
                                        {updatingRequestId === r._id
                                          ? "Updating..."
                                          : "Accept"}
                                      </button>

                                      <button
                                        className="btn btn-error btn-sm text-xs"
                                        onClick={() =>
                                          handleUpdateRequestStatus(
                                            r._id,
                                            "rejected"
                                          )
                                        }
                                        disabled={updatingRequestId === r._id}
                                      >
                                        {updatingRequestId === r._id
                                          ? "Updating..."
                                          : "Reject"}
                                      </button>
                                    </>
                                  ) : (
                                    <span className="text-xs text-slate-500">
                                      Completed
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right column: show BUYER form only when NOT owner */}
          {!isOwner && (
            <div className="md:col-span-1">
              <div className="relative rounded-2xl border shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
                <div className="p-5 space-y-5 bg-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        Submit Interest
                      </h2>
                      <p className="text-xs text-slate-500">
                        Let the seller know what you need.
                      </p>
                    </div>
                    <div className="px-2 py-1 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {crop.unit} price ৳{crop.pricePerUnit}
                    </div>
                  </div>

                  {alreadyInterested ? (
                    <div className="p-5 text-center border rounded-xl bg-slate-50">
                      <p className="text-emerald-700 font-semibold mb-2">
                        You've already sent an interest for this crop.
                      </p>
                      <p className="text-xs text-slate-500">
                        You cannot send another interest for the same crop.
                      </p>
                    </div>
                  ) : localQuantity === 0 ? (
                    <div className="p-5 text-center border rounded-xl bg-red-50">
                      <p className="text-red-700 font-semibold mb-2">
                        Out of Stock
                      </p>
                      <p className="text-xs text-red-500">
                        This crop is currently not available.
                      </p>
                    </div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleOpenConfirm}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Quantity ({crop.unit})
                          </span>
                        </label>
                        <div className="join w-full">
                          <input
                            type="number"
                            name="quantity"
                            min={1}
                            max={localQuantity}
                            inputMode="numeric"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="input input-bordered join-item w-full"
                            placeholder={`Enter ${crop.unit} amount`}
                          />
                          <span className="join-item px-3 flex items-center text-sm text-slate-500 border border-l-0 rounded-r-lg">
                            {crop.unit}
                          </span>
                        </div>
                        {error ? (
                          <p className="mt-1 text-xs text-red-600">{error}</p>
                        ) : null}
                        <p className="text-xs text-slate-500 mt-1">
                          Available: {localQuantity} {crop.unit}
                        </p>
                      </div>

                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Message
                          </span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered w-full min-h-24"
                          placeholder="Add any details (delivery, timing, etc.)"
                          value={message}
                          name="message"
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                      <div className="p-3 rounded-xl border bg-slate-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">
                            Total Price
                          </span>
                          <span className="text-lg font-semibold text-slate-900">
                            ৳{isNaN(total) ? 0 : total}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Auto-calculated = quantity × price per unit
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-emerald w-full"
                        disabled={posting || localQuantity === 0}
                      >
                        {posting ? "Please wait..." : "Submit Interest"}
                      </button>
                    </form>
                  )}

                  {postError ? (
                    <div className="alert alert-error p-3">
                      <p className="text-sm text-red-600">{postError}</p>
                    </div>
                  ) : null}
                  <p className="text-[11px] text-slate-400">
                    By submitting, your interest details will be shared with the
                    seller. No payment collected here.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm your interest</h3>
          <div className="mt-3 space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Crop:</span>{" "}
              <span className="font-medium">{crop.name}</span>
            </p>
            <p>
              <span className="text-slate-500">Quantity:</span>{" "}
              <span className="font-medium">
                {quantity} {crop.unit}
              </span>
            </p>
            <p>
              <span className="text-slate-500">Total:</span>{" "}
              <span className="font-semibold">৳{isNaN(total) ? 0 : total}</span>
            </p>
            {message?.trim() ? (
              <div>
                <p className="text-slate-500">Message:</p>
                <p className="mt-1 p-2 rounded-md bg-slate-50 border text-slate-700">
                  {message}
                </p>
              </div>
            ) : null}
          </div>

          <div className="modal-action">
            <div className="flex gap-2">
              <button
                onClick={() => modalRef.current && modalRef.current.close()}
                className="btn btn-outline"
                type="button"
                disabled={posting}
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="btn btn-emerald"
                type="button"
                disabled={posting}
              >
                {posting ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CropsDetails;