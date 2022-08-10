import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, TronProvider, Content } from 'containers';
import { useConnectWallet, useJackpot } from 'hooks';

const App = () => {
  useJackpot();
  const { connectOnStart } = useConnectWallet();

  useEffect(() => {
    connectOnStart();
  }, [connectOnStart]);

  return (
    <TronProvider>
      <ToastContainer hideProgressBar />
      <Content>
        <Routes />
      </Content>
    </TronProvider>
  );
};

export default App;
