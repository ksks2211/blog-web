import Spinner from "../components/Spinner";

const LoadingPage = () => {
  return (
    <div className="fixed w-screen h-screen flex items-center justify-center inset-0">
      <Spinner />
    </div>
  );
};

export default LoadingPage;
