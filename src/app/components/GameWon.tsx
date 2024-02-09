import React from 'react';
import styled from 'styled-components';

type GameWonProps = {
  winningPlayer: string;
};

const WinningPlayer = styled.div({
  display: 'flex',
  marginTop: '12px',
  justifyContent: 'center',
});

function GameWon({ winningPlayer }: GameWonProps) {
  return (
    <>
      <WinningPlayer>{winningPlayer} WINS.</WinningPlayer>
      <button>Set up new game?</button>
    </>
  );
}

export default GameWon;
