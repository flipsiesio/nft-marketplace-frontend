import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, TronProvider, Content } from 'containers';
import ConnectWalletProvider from 'context/ConnectWalletProvider';
import { useJackpot } from 'hooks';

const App = () => {
  useJackpot();

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
