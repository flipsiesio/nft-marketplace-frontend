import React, {
  createContext, Dispatch, FC, SetStateAction, useState,
} from 'react';

type Context = {
  isOpenGameCombination: boolean,
  setIsOpenGameCombination: Dispatch<SetStateAction<boolean>>,
};

export const GameCombinationsContext = createContext<Context>({
  isOpenGameCombination: false,
  setIsOpenGameCombination: () => {},
});

export const GameCombinationsProvider: FC = ({ children }) => {
  const [isOpenGameCombination, setIsOpenGameCombination] = useState(false);

  return (
    <GameCombinationsContext.Provider value={{ isOpenGameCombination, setIsOpenGameCombination }}>
      {children}
    </GameCombinationsContext.Provider>
  );
};
