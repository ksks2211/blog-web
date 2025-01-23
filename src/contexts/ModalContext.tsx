import {
  createContext,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

type ModalContent = React.ReactElement | null;

type ModalState = {
  isModalOpen: boolean;
  modalContent: ModalContent;
};

type ModalAction = {
  openModal: (content: React.ReactElement) => void;
  closeModal: () => void;
  setIsUserTriggered: (isUserTriggered: boolean) => void;
};

const ModalStateContext = createContext<ModalState | undefined>(undefined);
const ModalActionContext = createContext<ModalAction | undefined>(undefined);

interface ModalProviderProps {
  children?: React.ReactNode;
}

const ModalOverlay = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center"
      {...props}
    />
  );
};

const ModalPortal = ({ children }: ModalProviderProps) =>
  createPortal(children, document.getElementById("modal-root") as Element);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [isUserTriggered, setIsUserTriggered] = useState(false);

  const navigate = useNavigate();

  const openModal = useCallback((content: React.ReactElement) => {
    setModalContent(content);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setIsModalOpen(false);
  }, []);

  const handleModalCloseAndNavigate = () => {
    closeModal();
    if (isUserTriggered) {
      navigate(-1);
    } else {
      navigate(location.pathname, { replace: true });
    }
  };

  const modalStateValue = useMemo(
    () => ({ isModalOpen, modalContent }),
    [isModalOpen, modalContent]
  );
  const modalActionValue = useMemo(
    () => ({ openModal, closeModal, setIsUserTriggered }),
    [closeModal, openModal]
  );

  return (
    <ModalStateContext.Provider value={modalStateValue}>
      <ModalActionContext.Provider value={modalActionValue}>
        {isModalOpen && (
          <ModalPortal>
            <ModalOverlay>
              <div>{modalContent}</div>
              <button
                className="text-white"
                onClick={handleModalCloseAndNavigate}
              >
                Close
              </button>
            </ModalOverlay>
          </ModalPortal>
        )}
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export { ModalActionContext, ModalProvider, ModalStateContext };
