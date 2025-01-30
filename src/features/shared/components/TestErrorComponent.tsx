import React from "react";

const TestErrorComponent: React.FC = () => {
  throw new Error("This is a test error from TestErrorComponent");

  return <div>This will never be rendered.</div>;
};

export default TestErrorComponent;
