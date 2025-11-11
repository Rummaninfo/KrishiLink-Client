import axios from "axios";
import React, { use, useMemo, useRef, useState } from "react";
import { Navigate, useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const CropsDetails = () => {
  let crop = useLoaderData();
  let {user} = use(AuthContext)
  console.log(user)
  

  // ----- Form state -----
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const pricePerUnit = Number(crop?.pricePerUnit ?? 0);
  const total = useMemo(() => {
    const q = Number(quantity) || 0;
    return q * pricePerUnit;
  }, [quantity, pricePerUnit]);

  const handleOpenConfirm = (e) => {
    e.preventDefault();

    let quantity = e.target.quantity.value;
    let message = e.target.message.value;
    console.log(quantity, message);

    let interest = {
     cropId: crop._id,
    userEmail: user.email,      
    userName: user.displayName,   
    quantity,
    message,
    status: "pending"
    };
    console.log(interest)

    axios.post("http://localhost:9000/myinterest", interest)
    .then((r)=>{
      console.log(r)
    })
    .catch(err=>{
      console.log(err)
    })

    // validation
    if (!quantity || Number(quantity) < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    setError("");
    if (modalRef.current && typeof modalRef.current.showModal === "function") {
      modalRef.current.showModal();
    }
  };

  const handleConfirm = () => {
    // No real submit per your request ("no function")
    // Just close the modal to simulate a confirmation
    if (modalRef.current) modalRef.current.close();
  };

  return (
    <>
      <div className=" mx-auto p-6">
        {/* Back Button */}
        <button onClick={() => Navigate(-1)} className="btn btn-outline mb-6">
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
                      {crop.quantity} {crop.unit}
                    </p>
                  </div>

                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Location</p>
                    <p className="text-base font-medium">{crop.location}</p>
                  </div>

                  <div className="border p-3 rounded-lg">
                    <p className="text-slate-500 text-xs">Seller</p>
                    <p className="text-base font-medium">
                      {crop.owner.ownerName}
                      <span className="text-slate-500">
                        {" "}
                        ({crop.owner.ownerEmail})
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interest Form Card */}
          {
            (user.email == crop.owner.ownerEmail)?
           "":
           <div className="md:col-span-1">
            <div className="relative rounded-2xl border shadow-sm overflow-hidden">
              {/* Decorative top band */}
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

                <form className="space-y-4" onSubmit={handleOpenConfirm}>
                  {/* Quantity */}
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
                  </div>

                  {/* Message */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Message</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full min-h-24"
                      placeholder="Add any details (delivery, timing, etc.)"
                      value={message}
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Total */}
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

                  {/* Submit */}
                  <button type="submit" className="btn btn-emerald w-full">
                    Submit Interest
                  </button>
                </form>

                {/* Small fine print */}
                <p className="text-[11px] text-slate-400">
                  By submitting, your interest details will be shared with the
                  seller. No payment collected here.
                </p>
              </div>
            </div>
          </div>
          }
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
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button onClick={handleConfirm} className="btn btn-emerald">
                Confirm
              </button>
            </form>
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
