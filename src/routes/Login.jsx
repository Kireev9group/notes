import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../components/userContext";

function Login() {
  const navigate = useNavigate();

  const userContext = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);

  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);

  const handleLogin = useCallback(() => {
    fetch(`http://localhost:5000/users?email=${email}&password=${password}`)
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
        } else {
          setErrorUser("User data is invalid");
        }
      });
  }, [email, navigate, password, userContext]);

  useEffect(() => {
    if (userContext.user?.email) {
      navigate("/about");
    }
  }, [navigate, userContext.user]);

  return (
    <>
      <div className="flex flex-col items-center gap-1 mt-10">
        {errorUser && <div className="text-red-500"> {errorUser} </div>}
        <input
          className="h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
          placeholder="email"
          value={email}
          onChange={handleSetEmail}
        />
        <input
          className="h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
          placeholder="password"
          type="password"
          value={password}
          onChange={handleSetPassword}
        />
        <button
          className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-5"
          onClick={handleLogin}
        >
          Log in
        </button>

        <Link
          to="/register"
          className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-1"
        >
          Don't have an account? Register
        </Link>
      </div>
      <footer className="flex   pr-10 mt-5 text-xl justify-around text-gray-400 mt-134.4">
        <span>Student: Kireev Mikhail </span>
        <span>BSU: 2022</span>
      </footer>
    </>
  );
}

export default Login;
