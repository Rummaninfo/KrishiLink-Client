import React from "react";

export default function Farmingtips() {
  return (
    <div className="min-h-screen bg-green-50 p-6">
      
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-2">
          🌾 Farming Tips
        </h1>
        <p className="text-gray-600">
          Smart farming practices to increase crop yield
        </p>
      </div>

      {/* Tips Cards Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <TipCard
          title="Soil Preparation"
          icon="🌱"
          desc="Test soil quality and add organic compost before planting."
        />
        <TipCard
          title="Water Management"
          icon="💧"
          desc="Use drip irrigation to reduce water wastage."
        />
        <TipCard
          title="Pest Control"
          icon="🐛"
          desc="Apply eco-friendly pesticides to protect crops."
        />
        <TipCard
          title="Crop Rotation"
          icon="🔄"
          desc="Rotate crops each season to improve soil fertility."
        />
        <TipCard
          title="Fertilizer Use"
          icon="🧪"
          desc="Use balanced fertilizers as per crop requirements."
        />
        <TipCard
          title="Harvest Timing"
          icon="🌾"
          desc="Harvest crops at the right time to maximize profit."
        />
      </div>

      {/* Weather Advisory Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-12">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          ☀️ Weather Advisory
        </h2>
        <p className="text-gray-600">
          Always check weather forecasts before irrigation or pesticide
          application to avoid crop damage.
        </p>
      </div>

      {/* Seasonal Crops Section */}
      <div className="bg-green-100 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🌦 Seasonal Crops
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Summer: Rice, Maize</li>
          <li>Winter: Wheat, Mustard</li>
          <li>Rainy: Jute, Paddy</li>
        </ul>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 text-sm">
        © 2026 KrishiLink | Smart Farming Solutions
      </div>
    </div>
  );
}

/* Reusable Card Component */
function TipCard({ title, icon, desc }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-green-600 mb-2">
        {icon} {title}
      </h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
