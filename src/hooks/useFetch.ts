// src/hooks/useFetch.ts
import { useState, useEffect } from "react";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import useAuth from "./useAuth";

// Define the return type of the API
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T = unknown>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Assuming useAuth returns { token: string }

  useEffect(() => {
    let isMounted = true;
    const source: CancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
            // Other headers if needed
          },
        });

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else if (isMounted) {
          setError("Failed to fetch data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      source.cancel("Operation canceled by the user.");
    };
  }, [url, token]); // Include token in dependency array to react to changes in token

  return { data, loading, error };
};

export default useFetch;
