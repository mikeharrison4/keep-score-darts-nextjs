'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

// import ContinueGameModal from './ContinueGameModal';
import { generateFinishers } from '@/app/utils/generateFinishers';
import { PlayerConfig } from '@/app/config/page';

const SCORE_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 50,
  0,
];

type ScoreboardProps = {
  playersConfig: Array<PlayerConfig>;
  updatePlayersScore: (score: number) => void;
  nextPlayer: () => void;
  currentPlayerIndex: number;
  clearGame: () => void;
};

const Container = styled.div({
  maxWidth: '75%',
  margin: '20px auto',
  padding: '12px',
});

const PlayerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px  solid lightgray',
});

const PlayerName = styled.h4<{ active: boolean }>(({ active }) => ({
  textTransform: 'uppercase',
  fontSize: '2rem',
  padding: '20px 0',
  letterSpacing: '3px',
  fontWeight: 100,

  ...(active && {
    fontWeight: 'bold',
  }),
}));

const PlayerScore = styled.div({
  letterSpacing: '5px',
  padding: '8px',
});

const ScoreValues = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  width: '100%',
  gridGap: '1px',
  margin: '20px 0px',

  '> *': {
    cursor: 'pointer',
    height: '40px',
  },

  '> *:last-child': {
    gridColumn: 'span 2',
  },
});

const ScoreInputs = styled.div({
  display: 'flex',
  margin: 'auto',
  justifyContent: 'center',
  width: '25%',
});

const Input = styled.div({
  background: 'white',
  padding: '4px 10px',
  margin: '4px',
  color: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '30px',
});

const BoostScoresAndUndo = styled.div({
  display: 'flex',

  '> *': {
    width: '100%',
    cursor: 'pointer',
  },
});

const BoostButton = styled.button({
  border: 'none',
});

const DoubleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orange',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  })
);

const TripleBtn = styled(BoostButton)<{ selected: boolean }>(
  ({ selected }) => ({
    background: 'orangered',
    ...(selected && { border: '3px solid black' }),

    ':hover': {
      opacity: '.8',
    },
  })
);

const UndoBtn = styled(BoostButton)({
  background: 'red',

  ':hover': {
    opacity: '.8',
  },

  ':disabled': {
    cursor: 'not-allowed',
  },
});

function hasPlayerWon(playerScore: number, isCheckoutModeEnabled: boolean) {
  return isCheckoutModeEnabled && playerScore === 0;
}

function hasPlayerGoneBust(
  playerScore: number,
  isCheckoutModeEnabled: boolean
) {
  return playerScore < 0 || (!isCheckoutModeEnabled && playerScore === 0);
}

function Scoreboard({
  playersConfig,
  updatePlayersScore,
  nextPlayer,
  currentPlayerIndex,
  clearGame,
}: ScoreboardProps) {
  const [throws, setThrows] = useState(3); // change this to 0
  const [scores, setScores] = useState<Array<any>>([null, null, null]);
  const [playerScorePerRound, setPlayerScorePerRound] = useState(0);
  const [isDouble, setIsDouble] = useState(false);
  const [isTriple, setIsTriple] = useState(false);

  const currentPlayerScore = playersConfig[currentPlayerIndex].score;

  function nextPlayerHandler() {
    setThrows(3);
    setScores([null, null, null]);
    setPlayerScorePerRound(0);
    nextPlayer();
  }

  function handleUndo() {
    const scoreIndex = 3 - throws - 1;
    if (!scores[scoreIndex]) return;

    setPlayerScorePerRound((prev) => prev - scores[scoreIndex]);
    const newScores = [...scores];
    newScores[scoreIndex] = 0;

    setScores(newScores);
    updatePlayersScore(
      currentPlayerScore - (currentPlayerScore + scores[scoreIndex])
    );
    setThrows((prev) => prev + 1);
  }

  function handleClickScoreValue(value: number) {
    let dartValue = value;

    if (isDouble) {
      setIsDouble(false);
      dartValue = dartValue * 2;
    }

    if (isTriple) {
      setIsTriple(false);
      dartValue = dartValue * 3;
    }

    setThrows((prev) => prev - 1);

    setScores((prev) => {
      prev[3 - throws] = dartValue;
      return prev;
    });

    setPlayerScorePerRound((prev) => prev + dartValue);

    if (hasPlayerGoneBust(currentPlayerScore - dartValue, isDouble)) {
      nextPlayerHandler();
      return;
    }

    updatePlayersScore(dartValue);

    if (hasPlayerWon(currentPlayerScore - dartValue, isDouble)) {
      console.log('WON!!!');
      return;
    }

    if (throws - 1 === 0) {
      nextPlayerHandler();
    }
  }

  const finishers: Array<string> | null =
    currentPlayerScore <= 170
      ? generateFinishers(currentPlayerScore, throws).sort(
          (a, b) => a.length - b.length
        )[0]
      : null;

  return (
    <>
      {/*{showContinueGamePopup && <ContinueGameModal clearGame={clearGame} />}*/}
      <Container>
        {playersConfig.map(({ player, score }, index) => (
          <PlayerContainer key={player}>
            <PlayerName active={currentPlayerIndex === index}>
              {player}
              {currentPlayerIndex === index ? ` ${'🎯'.repeat(throws)}` : ''}
            </PlayerName>
            <PlayerScore>{score}</PlayerScore>
          </PlayerContainer>
        ))}
        <ScoreValues>
          {SCORE_VALUES.map((value) => (
            <button
              key={value}
              value={value}
              onClick={() => handleClickScoreValue(value)}
              disabled={(isTriple || isDouble) && [50, 25, 0].includes(value)}
            >
              {value}
            </button>
          ))}
          <BoostScoresAndUndo>
            <DoubleBtn onClick={() => setIsDouble(true)} selected={isDouble}>
              Double
            </DoubleBtn>
            <TripleBtn onClick={() => setIsTriple(true)} selected={isTriple}>
              Triple
            </TripleBtn>
            <UndoBtn onClick={handleUndo} disabled={throws === 3}>
              Undo
            </UndoBtn>
          </BoostScoresAndUndo>
        </ScoreValues>
        {finishers?.length && (
          <div>
            {finishers.map((num, index) => (
              <div key={index}>{num}</div>
            ))}
          </div>
        )}
        <ScoreInputs>
          {scores.map((score, index) => (
            <Input key={index}>{score}</Input>
          ))}
        </ScoreInputs>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={clearGame}>Clear game</button>
          <div>{playerScorePerRound}</div>
        </div>
      </Container>
    </>
  );
}

export default Scoreboard;
