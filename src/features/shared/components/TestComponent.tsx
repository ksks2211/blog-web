import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModalAction, useModalState } from "../hooks/useModal";

const TestComponent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setIsUserTriggered, closeModal, openModal } = useModalAction();
  const { isModalOpen } = useModalState();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id === null && isModalOpen) {
      closeModal();
    } else if (id !== null && !isModalOpen) {
      openModal(<div className="text-white bg-purple-500">Modal Content</div>);
    }
  }, [closeModal, isModalOpen, searchParams, openModal]);

  const handleClick = () => {
    searchParams.set("id", "123");
    navigate(`?${searchParams.toString()}`, { replace: false });
    setIsUserTriggered(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>

      <button
        onClick={handleClick}
        className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-md"
      >
        Open Modal
      </button>
    </div>
  );
};

export default TestComponent;
