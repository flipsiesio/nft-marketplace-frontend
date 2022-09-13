import React, { FC, PropsWithChildren } from 'react';
import { FullPreloader } from 'containers';

const TronProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <FullPreloader
      isLoading={false}
    >
      {children}
    </FullPreloader>
  );
};

export default TronProvider;
