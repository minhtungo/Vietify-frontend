import React, { createContext, useContext } from 'react';

interface ModalContext {
  close: () => void;
}

const ModalContext = createContext<ModalContext | null>(null);

interface ModalProviderProps {
  children?: React.ReactNode;
  close: () => void;
}

export const ModalProvider = ({ children, close }: ModalProviderProps) => {
  return (
    <ModalContext.Provider
      value={{
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  return context;
};
