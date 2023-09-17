import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { ButtonLink } from "./ui";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center py-5 px-10 rounded-lg container mx-auto">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-[1.25rem] font-bold sm:text-2xl">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-9">
        {isAuthenticated ? (
          <>
            <li>Welcome {user?.username}</li>
            <li>
              <ButtonLink to="/add-task">Add Task</ButtonLink>
            </li>
            <li onClick={logout}>
              <Link to="/" className="bg-red-500 px-4 py-2 rounded-sm">
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
