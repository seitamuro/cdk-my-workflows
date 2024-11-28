import { useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";

export const BucketListPage = () => {
  const [buckets, setBuckets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { get } = useHttp();
  const { data, error: fetchError } = get<{ buckets: [string] }>("/bucket-list");

  useEffect(() => {
    if (data) {
      setBuckets(data.buckets);
    }
    if (fetchError) {
      setError(fetchError.message);
    }
  }, [data, fetchError]);

  return (
    <>
      <h2>S3 Buckets</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {
            buckets.map((bucket, index) => (
              <p key={index}>{bucket}</p>
            ))
          }
        </ul>
      )
      }
    </>
  )
}