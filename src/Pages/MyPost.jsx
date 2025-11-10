import React, { use, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Atom } from "react-loading-indicators";


const MyPost = () => {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  let {loading} = use(AuthContext)
    const [selected, setSelected] = useState(null);
   console.log(selected)
  
  console.log(rows)

  console.log(rows);
  let cropRef = useRef();
  
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("http://localhost:9000/myposts", {
        params: { email: user.email },
      })
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);
 if(loading){
    return (
         <div className="flex justify-center items-center min-h-screen">
                    <Atom color="#32cd32" size="medium" text="" textColor="" />
                  </div>
    )
  }
  let editbtn = (item) => {
    console.log(item)
    setSelected(item)
    cropRef.current.showModal();
  };

  let updatedcrop = (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let pricePerUnit = e.target.pricePerUnit.value;
    let quantity = e.target.quantity.value;
    let updateinfo={
        name, pricePerUnit, quantity
    }
    axios.put(`http://localhost:9000/myposts/${selected._id}`, updateinfo)
    .then((r)=>{
        console.log(r)

     axios
      .get("http://localhost:9000/myposts", {
        params: { email: user.email },
      })
      .then((res) => setRows(res.data))



    })
  };

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
                    <button onClick={()=> editbtn(item)} className="btn btn-xs">
                      Edit
                    </button>

                    <dialog
                      ref={cropRef}
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <form onSubmit={updatedcrop} className="space-y-4">
                          {/* Crop Name */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Crop Name
                              </span>
                            </label>
                            <input
                            defaultValue={rows.name}
                              type="text"
                              name="name"
                              placeholder="e.g., Tomato"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          {/* Crop Price */}
                          <div className="form-control">
                            <label className="label">
                              <span  className="label-text font-medium">
                                Price (৳)
                              </span>
                            </label>
                            <input
                             defaultValue={item.pricePerUnit}
                              type="number"
                              name="pricePerUnit"
                              min="0"
                              step="0.01"
                              placeholder="e.g., 55"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          {/* Quantity */}
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Quantity
                              </span>
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              min="0"
                              placeholder="e.g., 350"
                              className="input input-bordered w-full"
                              required
                            />
                          </div>

                          {/* Submit */}
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
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <button className="btn btn-xs btn-error text-white">
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
