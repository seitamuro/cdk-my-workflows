import { getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { SignUpWithGoogle } from "../components/SignUpWithGoogle";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

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

      <SignUpWithGoogle />
      <SignIn />
      <SignUp />

      <div>
        <h2>ユーザー情報</h2>
        <p>ユーザー名: {username}</p>
        <p>ユーザーID: {userId}</p>
      </div>
    </div>
  );
}