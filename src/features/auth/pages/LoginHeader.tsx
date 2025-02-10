import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const LoginHeader = () => {
  const { pathname } = useLocation();

  const isLoginPath = pathname === "/login";

  const sideClassName =
    "order-1 text-neutral-400 hover:text-neutral-600 absolute left-0 cursor-pointer";
  const mainClassName = "order-2 text-success pointer-events-none";

  return (
    <header
      className={clsx(
        "w-full min-h-14 flex-grow-0 flex items-center bg-base-200/75  border-solid ring-1 ring-neutral/25 border-b-slate-200 ",
        "px-6 md:px-[10%] lg:px-[16%]"
      )}
    >
      <nav className="w-full h-full">
        <ul
          className="h-full w-full flex flex-row items-center justify-center relative font-extrabold text-xl tracking-wide"
          aria-label="navigation"
        >
          <li className={clsx(isLoginPath ? sideClassName : mainClassName)}>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className={clsx(!isLoginPath ? sideClassName : mainClassName)}>
            <Link to="/login">Log In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LoginHeader;
