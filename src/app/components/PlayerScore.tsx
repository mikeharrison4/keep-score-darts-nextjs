import React from 'react';
import styled from 'styled-components';

type PlayerScoreProps = {
  player: string;
  isActive: boolean;
  throws: number;
  score: number;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px  solid lightgray',
});

const Name = styled.h4<{ active: boolean }>(({ active }) => ({
  textTransform: 'uppercase',
  fontSize: '2rem',
  padding: '20px 0',
  letterSpacing: '3px',
  fontWeight: 100,

  ...(active && {
    fontWeight: 'bold',
  }),
}));

const Score = styled.div({
  letterSpacing: '5px',
  padding: '8px',
});

function PlayerScore({ player, isActive, throws, score }: PlayerScoreProps) {
  return (
    <Container>
      <Name active={isActive}>
        {player}
        {isActive ? ` ${'🎯'.repeat(throws)}` : ''}
      </Name>
      <Score>{score}</Score>
    </Container>
  );
}

export default PlayerScore;
