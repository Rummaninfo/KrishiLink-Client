import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { updateProfile } from "firebase/auth";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    setDisplayName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      setSaving(true);
      await updateProfile(user, {
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null,
      });
      await user.reload?.();
      // optional toast/alert
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  if (!user)
    return <div className="min-h-[60vh] grid place-items-center">Loading…</div>;

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl shadow-xl border border-white/60 bg-white/60 backdrop-blur-xl">
        <div className="p-8 sm:p-10 bg-gradient-to-b from-white/70 to-amber-50/20 rounded-2xl">
          {/* avatar */}
          <div className="flex flex-col items-center">
            <img
              src={
                photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName || user.email || "User"
                )}&background=E2E8F0&color=0F172A`
              }
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md"
            />

            {/* name */}
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">
              {displayName || "—"}
            </h2>

            {/* email */}
            <p className="mt-1 text-sm text-slate-600">{user.email}</p>
          </div>

          {/* inputs */}
          <div className="mt-8 space-y-4">
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-800 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-400"
            />

            <input
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              type="text"
              placeholder="Photo URL"
              className="w-full rounded-lg border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-800 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-lg bg-[#2563eb] px-4 py-2.5 text-white font-medium shadow-sm transition hover:bg-[#1e55c9] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save to changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
