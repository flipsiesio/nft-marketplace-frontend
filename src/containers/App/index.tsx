import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { connectToGameWs, connectRateWs } from 'store/api/actions';
import { connectTronAction } from 'store/tron/actions';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, TronProvider, Content } from 'containers';
import ConnectWalletProvider from 'context/ConnectWalletProvider';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(connectToGameWs());
    dispatch(connectRateWs());
    dispatch(connectTronAction({}));

    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    /**
     * Hokeystack script initialization
     */
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hockeystack@latest/hockeystack.min.js';
    script.async = true;
    // @ts-ignore
    script.onload = () => HockeyStack.init(process.env.REACT_APP_HOCKEYSTACK_API_KEY);
    document.head.appendChild(script);

    return () => {
      unlisten();
    };
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
