import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, TronProvider, Content } from 'containers';
import ConnectWalletProvider from 'context/ConnectWalletProvider';
import { useConnectWallet, useJackpot } from 'hooks';

const App = () => {
  useJackpot();
  const { connectOnStart } = useConnectWallet();

  useEffect(() => {
    connectOnStart();
  }, [connectOnStart]);

  // useEffect(() => {
  //   dispatch(connectTronAction({}));
  // }, []);

  return (
    <ConnectWalletProvider>
      <TronProvider>
        <ToastContainer hideProgressBar />
        <Content>
          <Routes />
        </Content>
      </TronProvider>
    </ConnectWalletProvider>
  );
};

export default App;
