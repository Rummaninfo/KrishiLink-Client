import axios from "axios";
import React, { useEffect, useState } from "react";

const UseFarmer = () => {
  let [crops, setCrops] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(()=>{
      setLoading(true)
      axios.get("https://krishilink-server-one.vercel.app/allcrops")
      .then(data=> setCrops(data.data))
      .catch(error => setError(error))
      .finally(()=> setLoading(false))

  }, [])

  return {crops, loading, error}
};

export default UseFarmer;
