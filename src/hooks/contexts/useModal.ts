import { useContext } from "react";
import {
  ModalActionContext,
  ModalStateContext,
} from "../../contexts/ModalContext";

export const useModalState = () => {
  const modalStateContext = useContext(ModalStateContext);
  if (!modalStateContext) {
    throw new Error("useModalState must be used within a ModalProvider");
  }
  return modalStateContext;
};

export const useModalAction = () => {
  const modalActionContext = useContext(ModalActionContext);
  if (!modalActionContext) {
    throw new Error("useModalAction must be used within a ModalProvider");
  }
  return modalActionContext;
};
