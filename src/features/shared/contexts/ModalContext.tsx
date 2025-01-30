import clsx from "clsx";
import { createContext, useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useEnhancedLockBodyScroll } from "../../scroll/useScroll.ts";

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

const ModalPortal = ({ children }: ModalProviderProps) =>
  createPortal(children, document.getElementById("modal-root") as Element);

const ModalOverlay = ({
  active,
  className,
  ...rest
}: { active: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
  useEnhancedLockBodyScroll(active);

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-black bg-opacity-30 z-30",
        "flex justify-center items-center overflow-y-hidden",
        active ? "pointer-events-auto" : "pointer-events-none",
        active ? "animate-fade-in" : "animate-fade-out",
        className
      )}
      {...rest}
    />
  );
};

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
            <ModalOverlay active={isModalOpen}>
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
