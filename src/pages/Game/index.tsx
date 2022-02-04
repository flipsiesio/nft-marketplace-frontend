import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { gameGetMaxbetAction, gameGetLastAction } from 'store/game/actions';
import { jackpotGetValueAction } from 'store/jackpot/actions';
import { Game as GameContainer } from 'containers';

const Game = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameGetMaxbetAction());
    dispatch(jackpotGetValueAction());
    dispatch(gameGetLastAction());
  }, []);

  return (
    <GameContainer />
  );
};

export default Game;
