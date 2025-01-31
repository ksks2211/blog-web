import { useState } from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState<
    undefined | string
  >(undefined);

  return (
    <div>
      login page
      {loginErrorMessage && <p>login error : {loginErrorMessage}</p>}
      <LoginForm setLoginErrorMessage={setLoginErrorMessage} />
    </div>
  );
};

export default LoginPage;
