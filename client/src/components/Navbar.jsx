import { NavLink, useLocation, useParams } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

function Navbar({ setLogged, logged, accountId, setAccountId }) {
  let { userId } = useParams();
  const location = useLocation();
  if (!userId) userId = accountId;
  const [navBarOpen, setNavBarOpen] = useState(false);
  const [search, setSearch] = useState(false);

  const handelNavBar = () => {
    setNavBarOpen(!navBarOpen);
    setSearch(false);
  };

  const handelSearch = () => {
    setSearch(!search);
    setNavBarOpen(false);
  };

  // Logout handle
  const handleLogged = () => {
    setLogged(false);
  };

  const windowSize = 1000;

  return (
    <div className=" px-4 py-3 bg-sky-950 relative">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <div className="flex gap-4 justify-center items-center">
          <NavLink
            to="/"
            className="text-3xl text-white italic cursor-pointer max-[500px]:text-xl"
          >
            Smart Tech
          </NavLink>
          {windowSize < window.innerWidth && <Dropdown />}
        </div>

        <ul className="flex justify-center items-center gap-5 text-xl text-white ">
          {windowSize >= window.innerWidth ? (
            <>
              <li className="navbar-log-reg" onClick={handelSearch}>
                <img
                  className={`w-8 max-[500px]:w-4`}
                  src="../../public/images/search.png"
                  alt="Nav Menu"
                />
              </li>
              <li className="navbar-log-reg" onClick={handelNavBar}>
                <img
                  className={`w-8 transition-all duration-300 ${
                    navBarOpen === true && "-rotate-90"
                  }`}
                  src="../../public/images/nav menu.png"
                  alt="Nav Menu"
                />
              </li>
            </>
          ) : (
            <>
              {!logged ? (
                <>
                  {location.pathname === "/" && (
                    <>
                      <li className="navbar-log-reg">
                        <NavLink to="/login">Login</NavLink>
                      </li>
                      <li className="navbar-log-reg">
                        <NavLink to="/register">Register</NavLink>
                      </li>
                    </>
                  )}
                  {location.pathname === "/register" && (
                    <li className="navbar-log-reg">
                      <NavLink to="/login">Login</NavLink>
                    </li>
                  )}
                  {location.pathname === "/login" && (
                    <li className="navbar-log-reg">
                      <NavLink to="/register">Register</NavLink>
                    </li>
                  )}
                </>
              ) : (
                <>
                  {location.pathname !== `/profile/${userId}` && (
                    <>
                      <li className="navbar-log-reg">
                        <NavLink to={`/profile/${userId}`}>Dashboard</NavLink>
                      </li>
                      <li className="navbar-log-reg">
                        <NavLink onClick={handleLogged} to="/login">
                          Logout
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              )}
              {location.pathname === `/profile/${userId}` && (
                <li className="navbar-log-reg">
                  <NavLink onClick={handleLogged} to="/login">
                    Logout
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>
        <ul
          className={`p-4 gap-2 flex flex-col justify-center items-center bg-slate-100 absolute w-full top-0 left-0 transition-all duration-500 font-semibold shadow-lg shadow-gray-500 ${
            !navBarOpen ? "-translate-y-40 -z-20" : "translate-y-14 z-10"
          }`}
        >
          <li className="navbar-log-reg">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="navbar-log-reg">
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
        <div
          className={`absolute shadow-lg shadow-gray-500 w-full top-0 left-0 ${
            !search ? "-translate-y-40 -z-20" : "translate-y-14 z-0"
          }`}
        >
          <Dropdown search={search} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
