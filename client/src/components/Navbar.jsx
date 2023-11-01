import { NavLink, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div className=" px-4 py-3 bg-sky-950 ">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <NavLink to="/" className="text-3xl text-white italic cursor-pointer">
          Smart Tech
        </NavLink>
        <ul className="flex justify-center items-center gap-5 text-xl text-white ">
          {location.pathname !== "/login" && (
            <li className="navbar-log-reg">
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          {location.pathname !== "/register" && (
            <li className="navbar-log-reg">
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
