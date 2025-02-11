import clsx from "clsx";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import logo from "../../shared/assets/logo.png";
import SnackbarAlert from "../../shared/components/SnackbarAlert";
import { useSnackbarState } from "../../shared/hooks/useSnackbarState";
import LoginForm from "../components/LoginForm";
import SigninForm from "../components/SignUpForm";
import LoginHeader from "./LoginHeader";

const LoginLayout = () => {
  return (
    <div className="w-screen h-screen overflow-auto flex flex-col bg-base-100">
      <LoginHeader />

      <main
        className={clsx(
          "w-full flex flex-col justify-center items-center py-12 "
        )}
      >
        {/* Login Card */}
        <div
          className={clsx(
            "flex-shrink-0 flex items-center flex-col h-[32rem] ",
            "w-full sm:w-7/12 md:w-1/2 lg:w-1/3",
            "py-3"
          )}
        >
          <LoginContent />
        </div>
      </main>
    </div>
  );
};

const LoginContent = () => {
  const { closeSnackbar, displaySnackbar, snackbarState } = useSnackbarState();
  const { pathname } = useLocation();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const message = params.get("error");
    if (message) {
      setParams();
      displaySnackbar(message);
    }
  }, [displaySnackbar, params, setParams]);

  const isLoginPath = pathname === "/login";

  return (
    <div className="w-full h-full card flex flex-col">
      <div className="w-full basis-1/3 flex-grow-0 flex flex-col pt-7  justify-center text-neutral">
        <div className="basis-1/2 flex items-center justify-center ">
          <img className="size-11 animate-rotate" src={logo} alt="logo" />
        </div>

        <h2 className="basis-1/2 flex items-start justify-center text-3xl font-extrabold font-oswald">
          {isLoginPath ? "Welcome!" : "Register!"}
        </h2>
      </div>

      <div className="flex-grow  w-full">
        {isLoginPath ? (
          <LoginForm setLoginErrorMessage={displaySnackbar} />
        ) : (
          <SigninForm setLoginMessage={displaySnackbar} />
        )}
      </div>

      <SnackbarAlert onClose={closeSnackbar} snackbarState={snackbarState} />
    </div>
  );
};

export default LoginLayout;
