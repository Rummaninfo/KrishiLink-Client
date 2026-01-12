// import { img } from "motion/react-client";
// import React, { use } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import Swal from "sweetalert2"; // <-- added

// const AddCrops = () => {
//   let { user } = use(AuthContext);
//   let navigate = useNavigate();
//   console.log(user);
//   let addCrop = (e) => {
//     e.preventDefault();
//     console.log("okkkkkk");
//     let name = e.target.name.value;
//     let type = e.target.type.value;
//     let pricePerUnit = e.target.pricePerUnit.value;
//     let unit = e.target.unit.value;
//     let quantity = e.target.quantity.value;
//     let description = e.target.description.value;
//     let location = e.target.location.value;
//     let image = e.target.image.value;
//     let owner = {
//       ownerEmail: user.email,
//       ownerName: user.displayName,
//     };

//     let info = {
//       name,
//       type,
//       pricePerUnit,
//       unit,
//       quantity,
//       description,
//       location,
//       image,
//       owner,
//     };
//     console.log(info);
//     axios
//       .post("http://localhost:9000/allcrops", info)
//       .then(() => {
//         // Success toast (auto-close) then navigate to /myposts
//         Swal.fire({
//           toast: true,
//           position: "top-end",
//           icon: "success",
//           title: "Crop added successfully",
//           showConfirmButton: false,
//           timer: 1500,
//           timerProgressBar: true,
//         }).then(() => {
//           navigate("/myposts");
//         });
//       })
//       .catch((error) => {
//         // Error alert with message
//         const message =
//           error?.response?.data?.message ||
//           error?.message ||
//           "Failed to add crop. Please try again.";
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: message,
//         });
//       });
//   };
//   return (
//     <section className="container mx-auto max-w-4xl p-4 md:p-8">
//       <header className="mb-6">
//         <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-emerald-700">
//           Add New Crop
//         </h1>
//         <p className="text-slate-600 mt-1">
//           Fill in the details below to create a crop post.
//         </p>
//       </header>

//       <form
//         className="rounded-2xl border bg-white dark:bg-gray-900 text-black dark:text-white   shadow-sm p-4 md:p-6 space-y-6"
//         onSubmit={addCrop}
//       >
//         {/* Basic info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium ">Crop Name</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="e.g., Tomato"
//               className="input input-bordered bg-white dark:bg-blue-950 dark:border-gray-950 border-gray-900 w-full"
//             />
//           </div>

//           <div className="form-control ">
//             <label className="label">
//               <span className="label-text font-medium">Type</span>
//             </label>
//             <select
//               name="type"
//               className="select select-bordered border-gray-900 bg-white dark:bg-blue-950 w-full"
//               defaultValue=""
//             >
//               <option value="" disabled>
//                 Select a type
//               </option>
//               <option>Vegetable</option>
//               <option>Fruit</option>
//               <option>Grain</option>
//               <option>Spice</option>
//               <option>Other</option>
//             </select>
//           </div>
//         </div>

//         {/* Pricing & quantity */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Price per Unit (৳)</span>
//             </label>
//             <input
//               type="number"
//               min="0"
//               name="pricePerUnit"
//               step="0.01"
//               placeholder="e.g., 55"
//               className="input input-bordered bg-white dark:bg-blue-950 border-gray-900 w-full"
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Unit</span>
//             </label>
//             <select
//               name="unit"
//               className="select select-bordered border-gray-900 dark:bg-blue-950 bg-white w-full"
//               defaultValue="kg"
//             >
//               <option>kg</option>
//               <option>ton</option>
//               <option>dozen</option>
//               <option>piece</option>
//               <option>bundle</option>
//             </select>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text  font-medium">
//                 Available Quantity
//               </span>
//             </label>
//             <input
//               name="quantity"
//               type="number"
//               min="0"
//               placeholder="e.g., 400"
//               className="input input-bordered border-gray-900 dark:bg-blue-950 bg-white w-full"
//             />
//           </div>
//         </div>

//         {/* Location & image */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Location</span>
//             </label>
//             <input
//               type="text"
//               name="location"
//               placeholder="e.g., Bogura"
//               className="input input-bordered border-gray-900 bg-white dark:bg-blue-950 w-full"
//             />
//             <span className="label-text-alt text-slate-500 mt-1">
//               District / area name
//             </span>
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-medium">Image URL</span>
//             </label>
//             <input
//               type="url"
//               name="image"
//               placeholder="https://example.com/crop.jpg"
//               className="input border-gray-900 bg-white dark:bg-blue-950 input-bordered w-full"
//             />
//             <span className="label-text-alt text-slate-500 mt-1">
//               Paste a direct link to the image
//             </span>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text font-medium">Description</span>
//           </label>{" "}
//           <br />
//           <textarea
//             name="description"
//             className="textarea textarea-bordered border-gray-900 bg-white dark:bg-blue-950 min-h-28"
//             placeholder="Write a short description... (e.g., Fresh organic tomatoes from local farm.)"
//           />
//           {/* <p className="text-xs text-slate-500 mt-1">Keep the description short and informative.</p> */}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-end gap-3 pt-2">
//           <button type="reset" className="btn btn-ghost">
//             Reset
//           </button>
//           <button
//             type="submit"
//             className="btn bg-emerald-600 hover:bg-emerald-700 text-white"
//           >
//             Add Crop
//           </button>
//         </div>
//       </form>

//       {/* Tips */}
//       <div className="mt-4 rounded-xl border bg-emerald-50 p-4 text-emerald-800 text-sm">
//         <ul className="list-disc ml-5 space-y-1">
//           <li>Use clear images (1200×800 recommended).</li>
//           <li>Make sure the price and unit are accurate.</li>
//           <li>Describe freshness, variety, and any certifications.</li>
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default AddCrops;
