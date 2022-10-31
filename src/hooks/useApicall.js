import axios from "axios";
import { useEffect, useState, useRef } from "react";

export const useApicall = ({
  path = "",
  method = "",
  token = "",
  getResponse,
  dependancies = [],
  callFetch,
}) => {
  const [data, setData] = useState([]);
  const baseUrl = process.env.REACT_APP_API_URL;
  // let fetch;
  //   const [fetchData, setFetchData] = useState();
  const fetchRef = useRef();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios({
          url: baseUrl + path,
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (getResponse) setData(getResponse(res));
      } catch (err) {
        console.error({ err });
      }
    };
    // callFetch?.(fetch);
    if (callFetch) callFetch(fetch);
    else fetchRef.current = fetch;
    // else setFetchData(fetch);
  }, [...dependancies]);
  return { data, setData, fetchRef };
};
