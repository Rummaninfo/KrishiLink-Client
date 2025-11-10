import React from 'react';
import { Navigate, useLoaderData } from 'react-router';

const CropsDetails = () => {
    let crop = useLoaderData()
  
    return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Back Button */}
      <button onClick={() => Navigate(-1)} className="btn btn-outline mb-6">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <div className="rounded-xl overflow-hidden border shadow-sm">
          <img src={crop.image} alt={crop.name} className="w-full h-full  object-cover" />
        </div>

        {/* Details */}
        <div className="space-y-4">

          <h1 className="text-3xl font-bold text-slate-900">{crop.name}</h1>

          <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 text-sm rounded-full">
            {crop.type}
          </span>

          <p className="text-slate-600 leading-relaxed">{crop.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">

            <div className="border p-3 rounded-lg">
              <p className="text-slate-500 text-xs">Price</p>
              <p className="text-lg font-semibold text-emerald-600">
                ৳{crop.pricePerUnit} <span className="text-sm text-slate-500">/{crop.unit}</span>
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
                <span className="text-slate-500"> ({crop.owner.ownerEmail})</span>
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
    );
};

export default CropsDetails;