import { getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const user = getCurrentUser();
    user.then((data) => {
      setUserId(data?.userId || '');
      setUsername(data?.username || '');
      console.log(data);
    }
    );
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <Link to="/signup">ユーザー登録</Link>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>

      <div>
        <h2>ユーザー情報</h2>
        <p>ユーザー名: {username}</p>
        <p>ユーザーID: {userId}</p>
        <p>アクセストークン: {auth.user?.access_token}</p>
        <p>IDトークン: {auth.user?.id_token}</p>
      </div>
    </div>
  );
}