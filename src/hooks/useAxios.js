import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (config, fetchNew) => {
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(config)
      .then((res) => setRes(res))
      .catch((err) => setErr(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { res, err, loading, setRes };
};

export default useAxios;
