import axios from "axios";
import { useEffect, useState, useRef } from "react";

export const useApicall = ({
  path = "",
  method = "",
  token = "",
  getResponse,
  getError,
  dependancies = [],
  callFetch,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const baseUrl = process.env.REACT_APP_API_URL;
  const fetchRef = useRef();

  useEffect(() => {
    const fetch = async (uploadData) => {
      try {
        const res = await axios({
          url: baseUrl + path,
          method,
          data: uploadData || null,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onSuccess(res);
        if (getResponse) setData(getResponse(res));
      } catch (err) {
        console.error(err);
        onError(err);
        // if (getError) setError(getError(err));
      }
    };
    if (callFetch) callFetch(fetch);
    else fetchRef.current = fetch;
  }, [...dependancies]);
  return { data, setData, fetchRef /* error */ };
};
