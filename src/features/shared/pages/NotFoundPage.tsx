import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for({pathname}) does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
