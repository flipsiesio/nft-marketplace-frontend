import React, {
  createContext,
  FC,
  PropsWithChildren,
  useState,
} from 'react';
import { NeedExtenstionModal } from 'components';

type Values = {
  handleOpen: () => void,
};

export const ConnectWalletContext = createContext<Values>({
  handleOpen: () => {},
});

type Props = {};

const ConnectWalletProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const handleOpen = () => setOpenModal(true);

  return (
    <ConnectWalletContext.Provider value={{ handleOpen }}>
      {children}
      <NeedExtenstionModal
        isOpen={isOpenModal}
        onClose={() => setOpenModal(false)}
      />
    </ConnectWalletContext.Provider>
  );
};

export default ConnectWalletProvider;
