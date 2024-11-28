import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpWithGoogle } from "../components/SignUpWithGoogle";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Home</h1>
      <Link to="/signup">ユーザー登録</Link>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>

      <SignUpWithGoogle />
    </div>
  );
}