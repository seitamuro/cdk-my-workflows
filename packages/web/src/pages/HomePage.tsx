import { useState } from "react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Home</h1>
      <p><Link to="/signup">Sign Up</Link></p>
      <p><Link to="/signin">Sign In</Link></p>
      <p><Link to="/signout">Sign Out</Link></p>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </div>
  );
}
