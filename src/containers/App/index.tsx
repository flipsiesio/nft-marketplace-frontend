import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { connectTronAction } from 'store/tron/actions';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, TronProvider, Content } from 'containers';
import ConnectWalletProvider from 'context/ConnectWalletProvider';
import { useJackpot } from 'hooks';

const App = () => {
  const dispatch = useDispatch();
  useJackpot();

  useEffect(() => {
    dispatch(connectTronAction({}));
  }, []);

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
