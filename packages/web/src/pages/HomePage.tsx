import { useState } from "react";
import { Link } from "react-router-dom";
import { useMyAuth } from "../hooks/useMyAuth";

export const HomePage = () => {
  const [count, setCount] = useState(0);
  const auth = useMyAuth();

  return (
    <div>
      <h1>Home</h1>
      <p><Link to="/signup">Sign Up</Link></p>
      <p><Link to="/signin">Sign In</Link></p>
      <p><Link to="/signout">Sign Out</Link></p>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>

      <div>
        {auth.isAuthenticated ? (
          <>
            <p>ログイン中</p>
            <p>userId: {auth.userId}</p>
            <p>Authorization: {auth.authorization}</p>

          </>
        ) : (
          <p>未ログイン</p>
        )}
      </div>
    </div>
  );
}
